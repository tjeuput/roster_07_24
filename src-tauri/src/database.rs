/*use rusqlite::{Connection, Result};

const DB_PATH: &str = "EncryptedDb.db";
const ENCRYPTION_KEY: &str = "p6%7P*KJzZpvK@jZS4Xb36hGPGMVuj@U!aDYYq6";

/* pub fn create_connection() -> Result<Connection> {
    let conn = Connection::open(DB_PATH)?;
    conn.pragma_update(None, "key", ENCRYPTION_KEY)?;
    Ok(conn)
} */

pub fn create_connection() -> Result<Connection>{
    let conn = Connection::open("ResourcesDb.db")?;
    Ok(conn)
}
the encrypted db has to be integrated later because currently I copy paste what is in tauri-sqlite repo
*/

use crate::state::ServiceAccess;
use rusqlite::{params, Connection, OptionalExtension, Result};
use tauri::AppHandle;
use std::fs;
use serde::{Serialize,Deserialize};
use chrono::{Local, NaiveDate, Datelike};
use std::collections::HashMap;
use std::sync::Arc;
use log::info;

const CURRENT_DB_VERSION: u32 = 1;

/// Initializes the database connection, creating the .sqlite file if needed, and upgrading the database
/// if it's out of date.
pub fn initialize_database(app_handle: &AppHandle) -> Result<Connection, rusqlite::Error> {
    let app_dir = app_handle.path_resolver().app_data_dir().expect("The app data directory should exist.");
    fs::create_dir_all(&app_dir).expect("The app data directory should be created.");
    let sqlite_path = app_dir.join("MyApp.sqlite");

    /*  store in network drive
        // Get the network path from an environment variable or use a default
    let network_path = env::var("MY_APP_DB_PATH")
        .unwrap_or_else(|_| String::from(r"\\SERVER\Share\MyAppData"));
    let network_path = PathBuf::from(network_path);
    
    // Ensure the directory exists
    fs::create_dir_all(&network_path).map_err(|e| format!("Failed to create directory: {}", e))?;
    
    let sqlite_path = network_path.join("MyApp.sqlite");

    // Attempt to open the database with retry logic
    let mut attempts = 0;
    let max_attempts = 3;
    let mut db = loop {
        match Connection::open(&sqlite_path) {
            Ok(conn) => break conn,
            Err(e) if attempts < max_attempts => {
                attempts += 1;
                eprintln!("Failed to connect to database, retrying ({}/{}): {}", attempts, max_attempts, e);
                std::thread::sleep(std::time::Duration::from_secs(2));
            }
            Err(e) => return Err(Box::new(e)),
        }
    };

    // ... rest of the function

    Ok(db)*/

    let mut db = Connection::open("ResourcesDb.db")?;

    let mut user_pragma = db.prepare("PRAGMA user_version")?;
    let existing_user_version: u32 = user_pragma.query_row([], |row| { Ok(row.get(0)?) })?;
    drop(user_pragma);

    upgrade_database_if_needed(&mut db, existing_user_version)?;

    Ok(db)
}

/// Upgrades the database to the current version.
pub fn upgrade_database_if_needed(db: &mut Connection, existing_version: u32) -> Result<(), rusqlite::Error> {
  if existing_version < CURRENT_DB_VERSION {
    db.pragma_update(None, "journal_mode", "WAL")?;

    let tx = db.transaction()?;

    tx.pragma_update(None, "user_version", CURRENT_DB_VERSION)?;

    tx.execute_batch(
      "
      CREATE TABLE items (
        title TEXT NOT NULL
      );"
    )?;

    tx.commit()?;
  }

  Ok(())
}


pub fn get_all(db: &Connection) -> Result<Vec<String>, rusqlite::Error> {
    let mut statement = db.prepare("SELECT * FROM TB_EMPLOYEE")?;
    let mut rows = statement.query([])?;
    let mut items = Vec::new();
    while let Some(row) = rows.next()? {
      let title: String = row.get("name")?;
  
      items.push(title);
    }
  
    Ok(items)
}


#[derive(Serialize,Deserialize)]
struct db_result_diesntplan {
  id: i32,
  name: String,
  last_name: String,
  sessions_planned: Vec<String>,
  sessions_updated: Vec<String>,
  rest_2023: i32,
  rum_rest: i32,
  year_holiday: i32,
  um_plan: i32,
}

pub fn get_table_schedule(db: &Connection) ->  Result<String, rusqlite::Error>{

  let mut stmt = db.prepare("
  WITH employees_data AS (
    SELECT 
        e.id_employee,
        e.name,
        e.last_name,
        GROUP_CONCAT(ss.name) AS sessions_planned,
        (
            SELECT COUNT(
                CASE
                   WHEN (sh_2023.updated_session_id IS NULL OR sh_2023.updated_session_id = '')
                         AND sh_2023.session_id = 6 THEN 1
                    WHEN sh_2023.updated_session_id = '6' THEN 1
                    ELSE NULL 
                END
            ) AS rest_2023
            FROM TB_SCHEDULE_2023 sh_2023
            INNER JOIN TB_YEAR_HOLIDAY yh ON yh.id_employee = sh_2023.id_employee
            WHERE yh.id_employee = e.id_employee AND yh.year = 2023
        ) AS rest_2023,
        (
            SELECT GROUP_CONCAT(COALESCE(TB_SESSION.name, ''))
			FROM TB_SCHEDULE_2024
			LEFT JOIN TB_SESSION ON TB_SCHEDULE_2024.updated_session_id = TB_SESSION.session_id
			WHERE TB_SCHEDULE_2024.id_employee = e.id_employee
        ) AS sessions_updated,
        (
            SELECT COUNT(
                CASE
                    WHEN (sh_2024.updated_session_id IS NULL OR sh_2024.updated_session_id = '')
                        AND sh_2024.session_id = 8 THEN 1
                    WHEN sh_2024.updated_session_id = '8' THEN 1
                    ELSE NULL 
                END
            ) AS rum
            FROM TB_SCHEDULE_2024 sh_2024
            WHERE sh_2024.id_employee = e.id_employee
        ) as rum,
        yh.year_holiday,
        COUNT(
            CASE WHEN (sh.updated_session_id IS NULL OR sh.updated_session_id = '')
                AND sh.session_id = 6 THEN 1
                ELSE NULL
            END) as um_plan	
    FROM TB_EMPLOYEE e
    INNER JOIN TB_SCHEDULE_2024 sh ON e.id_employee = sh.id_employee
    INNER JOIN TB_SESSION ss ON sh.session_id = ss.session_id
    INNER JOIN TB_YEAR_HOLIDAY yh ON yh.id_employee = e.id_employee AND yh.year = 2024
    GROUP BY e.id_employee, e.name, e.last_name, yh.year_holiday
)
SELECT id_employee,
    name,
    last_name,
    sessions_planned,
    sessions_updated,
    rest_2023,
    (rest_2023 - rum) AS rum_rest,
    year_holiday,
    um_plan
FROM employees_data;")?;

  let db_results: Vec<db_result_diesntplan> = stmt.query_map([], |row| {
    
    let id: i32 = row.get("id_employee")?;
    let name: String = row.get("name")?;
    let last_name: String = row.get("last_name")?;
    let sessions_planned: String = row.get("sessions_planned")?;
    let sessions_updated: String = row.get("sessions_updated")?;
    let rest_2023: i32 = row.get("rest_2023")?;
    let rum_rest:i32 = row.get("rum_rest")?;
    let year_holiday:i32 = row.get("year_holiday")?;
    let um_plan:i32 = row.get("um_plan")?;
    

    //Split the comma-separated string into a vector
    let sessions_planned: Vec<String> = sessions_planned
      .split(",")
      .map(|s| s.trim().to_string())
      .collect();

    let sessions_updated: Vec<String> = sessions_updated
    .split(",")
    .map(|s| s.trim().to_string())
    .collect();

    println!("Debug: Raw result - id: {}, name: {:?}, last_name: {}, sessions_planned: {:?}, sessions_updated: {:?}", id, name, last_name, sessions_planned, sessions_updated);
    
    Ok(db_result_diesntplan {
        id,
        name,
        last_name,
        sessions_planned,
        sessions_updated,
        rest_2023,
        rum_rest,
        year_holiday,
        um_plan,
    })
  })?.collect::<Result<_, rusqlite::Error>>()?;

  serde_json::to_string(&db_results)
        .map_err(|_| rusqlite::Error::ExecuteReturnedResults)
      
  }

const BATCH_SIZE: i32 = 1000;

pub fn update_schedule(app_handle: &Arc<tauri::AppHandle>) -> Result<(), Box<dyn std::error::Error>> {


  app_handle.db_mut(|db| {
      

      db.execute( "CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, last_updated TEXT)",
      [],
      )?;
      
      info!("Settings table checked/created.");

      let current_date = Local::now().date_naive();
      let first_day_of_year = NaiveDate::from_ymd_opt(current_date.year(), 1, 1).unwrap();
      let days_since_start = current_date.signed_duration_since(first_day_of_year).num_days() as i32;

      // Get the last updated date from settings
      let last_updated: Option<String> = db.query_row(
          "SELECT last_updated FROM settings WHERE key = 'schedule_update'",
          [],
          |row| row.get(0)
      ).optional()?;

      let start_date = last_updated
          .and_then(|s| NaiveDate::parse_from_str(&s, "%Y-%m-%d").ok())
          .unwrap_or(first_day_of_year);
      let mut start_day = start_date.signed_duration_since(first_day_of_year).num_days() as i32 + 1;

      while start_day <= days_since_start {
          let end_day = (start_day + BATCH_SIZE - 1).min(days_since_start);
          
          let mut updates = HashMap::new();

          {

          // Fetch records that need updating
          let mut stmt = db.prepare("
              SELECT id_employee, session_id, date_id 
              FROM TB_SCHEDULE_2024 
              WHERE date_id BETWEEN ? AND ? AND updated_session_id IS NULL
              LIMIT ?
          ")?;

          let rows = stmt.query_map(params![start_day, end_day, BATCH_SIZE], |row| {
              Ok((
                  row.get::<_, i32>(0)?, // id_employee
                  row.get::<_, i32>(1)?, // session_id
                  row.get::<_, i32>(2)?, // date_id
              ))
          })?;

          for row in rows {
              let (id_employee, session_id, date_id) = row?;
              updates.insert((id_employee, date_id), session_id);
          }
        }

          // Perform bulk update in a transaction
          let tx = db.transaction()?;
          {
              let mut update_stmt = tx.prepare("
                  UPDATE TB_SCHEDULE_2024 
                  SET updated_session_id = ? 
                  WHERE id_employee = ? AND date_id = ?
              ")?;

              for ((id_employee, date_id), session_id) in updates {
                  update_stmt.execute(params![session_id, id_employee, date_id])?;
              }
          }
          tx.commit()?;

          // Update the last processed day
          let last_updated_date = first_day_of_year + chrono::Duration::days(end_day as i64);
          db.execute(
              "INSERT OR REPLACE INTO settings (key, last_updated) VALUES ('schedule_update', ?)",
              params![last_updated_date.format("%Y-%m-%d").to_string()],
          )?;

          start_day = end_day + 1;
      }

      Ok(())
  })
}


