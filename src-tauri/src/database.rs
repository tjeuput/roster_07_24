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
use rusqlite::{Connection};
use tauri::AppHandle;
use std::fs;
use std::collections::HashMap;
use serde::{Serialize,Deserialize};

#[derive(Serialize,Deserialize)]
struct db_result_tb_dienstplan{
  id_bereich: i32,
    bereichabkuerzung: String,
    bereichsname: String,
    name: String,
    schedule_id: i32,
    id_employee: i32,
    date_id: i32,
    id_group: i32,
    session_id: i32,
    dienst_name: String,
    start_time: String,
    end_time: String,
    color_name: String,
}

#[derive(Clone, Debug, Serialize)]
struct Resource{
  id: String,
  name: String,
  title: String,
  parentId: Option<String>,
  group_only: bool
}

#[derive(Clone, Debug, Serialize)]
struct Event {
  id: String,
  start: String,
  end: String,
  resourceId: String,
  title: String,
  bgColor: String
}

#[derive(Serialize)]
pub struct MitarbeiterSchichtplan{
    pub resources: Vec<Resource>,
    pub events: Vec<Event>,
}

struct ErrMsg {
  message: String,
}

impl ErrMsg {
  fn new(message: &str) -> Self {
      ErrMsg { message: message.to_string() }
  }
}

const CURRENT_DB_VERSION: u32 = 1;

/// Initializes the database connection, creating the .sqlite file if needed, and upgrading the database
/// if it's out of date.
pub fn initialize_database(app_handle: &AppHandle) -> Result<Connection, rusqlite::Error> {
    let app_dir = app_handle.path_resolver().app_data_dir().expect("The app data directory should exist.");
    fs::create_dir_all(&app_dir).expect("The app data directory should be created.");
    let sqlite_path = app_dir.join("MyApp.sqlite");

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

pub fn get_table_schedule(db: &Connection) ->  Result<String, rusqlite::Error>{

  let mut stmt = db.prepare("
  SELECT 
      b.id_Bereich, 
      b.Bereichsabkuerzung, 
      b.Bereichsname, 
      e.name,
      schedule_id, 
      e.id_employee, 
      s.date_id, 
      e.id_group, 
      s.session_id, 
      ss.name as dienst,
      CAST(dt.date as TEXT) || ' ' || ss.start_time AS start_time,
      CAST(dt.date as TEXT) || ' ' || ss.end_time AS end_time,
      sc.color_name
      
  FROM 
      TB_SCHEDULE s
  JOIN 
      TB_EMPLOYEE e on e.id_employee = s.id_employee
  JOIN 
      TB_SESSION ss on ss.session_id = s.session_id
  JOIN 
      TB_Bereich b on b.id_Bereich = e.id_group
  LEFT JOIN 
      TB_DATE dt on dt.date_id = s.date_id
  JOIN
      TB_SESSION_COLOR sc on ss.session_id = sc.session_id
  ORDER BY 
      id_group, s.date_id ASC;")?;

      let db_results = stmt.query_map([], |row| {
          Ok(db_result_tb_dienstplan {
              id_bereich: row.get(0)?,
              bereichabkuerzung: row.get(1)?,
              bereichsname: row.get(2)?,
              name: row.get(3)?,
              schedule_id: row.get(4)?,
              id_employee: row.get(5)?,
              date_id: row.get(6)?,
              id_group: row.get(7)?,
              session_id: row.get(8)?,
              dienst_name: row.get(9)?,
              start_time: row.get(10)?,
              end_time: row.get(11)?,
              color_name: row.get(12)?,
          })
      })?;
  
      let mut resources: Vec<Resource> = Vec::new();
      let mut groups: HashMap<i32, String> = HashMap::new();  // To store group names with Bereich ID as key
      let mut events: Vec<Event> = Vec::new();
  
      for result in db_results {
          let data = result?;
          if !groups.contains_key(&data.id_bereich) {
              groups.insert(data.id_bereich, data.bereichsname.clone());
              resources.push(Resource {
                  id: format!("group{}", data.id_bereich),
                  name: data.bereichsname.clone(),
                  title: data.bereichsname,
                  parentId: None,
                  group_only: true,
              });
          }
          resources.push(Resource {
              id: data.id_employee.to_string(),
              name: data.name.clone(),
              title: data.name,
              parentId: Some(format!("group{}", data.id_bereich)),
              group_only: false,
          });
          events.push(Event {
              id: data.schedule_id.to_string(),
              start: data.start_time.clone(),
              end: data.end_time.clone(),
              resourceId: data.id_employee.to_string(),
              title: data.dienst_name.clone(),
              bgColor: data.color_name.clone(),
          });
      }
  
      let schichtplan = MitarbeiterSchichtplan {
          resources,
          events,
      };

      let json_string = match serde_json::to_string(&schichtplan) {
        Ok(json) => json,
        Err(e) => return Err(rusqlite::Error::ToSqlConversionFailure(Box::new(e))),
    };

      Ok(json_string)
  
  }