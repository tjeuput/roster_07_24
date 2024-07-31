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
use rusqlite::{Connection, Result};
use tauri::AppHandle;
use std::fs;
use serde::{Serialize,Deserialize};






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

struct items{
  name: String
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
  session_names: Vec<String>
}

pub fn get_table_schedule(db: &Connection) ->  Result<String, rusqlite::Error>{

  let mut stmt = db.prepare("
  SELECT e.id_employee,
		e.name,
		e.last_name,
	   group_concat(ss.name) as session_names
FROM TB_EMPLOYEE e
INNER JOIN TB_SCHEDULE sh ON e.id_employee = sh.id_employee
INNER JOIN TB_SESSION ss ON sh.session_id = ss.session_id
GROUP BY e.id_employee;")?;

  let db_results: Vec<db_result_diesntplan> = stmt.query_map([], |row| {
    
    let id: i32 = row.get("id_employee")?;
    let name: String = row.get("name")?;
    let last_name: String = row.get("last_name")?;
    let session_names_str: String = row.get("session_names")?;

    //Split the comma-separated string into a vector
    let session_names: Vec<String> = session_names_str
      .split(",")
      .map(|s| s.trim().to_string())
      .collect();


    
    println!("Debug: Raw result - id: {}, last_name: {}, session_names: {:?}", id, last_name, session_names);
    
    Ok(db_result_diesntplan {
        id,
        name,
        last_name,
        session_names,
    })
  })?.collect::<Result<_, rusqlite::Error>>()?;

  serde_json::to_string(&db_results)
        .map_err(|_| rusqlite::Error::ExecuteReturnedResults)
      
  }



