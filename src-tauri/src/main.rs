#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database; //v
mod state; 
use std::thread;
use state::{ServiceAccess, AppState}; //v
use tauri::{AppHandle, Manager}; //v
use log::info;
use std::sync::Arc;
use chrono::Utc;
use crate::database::update_schedule;



#[tauri::command]
fn greet(app_handle: AppHandle) -> String {

match app_handle.db(|db| database::get_all(db)) {
    Ok(items) => {
        let items_string = items.join(" | ");
        info!("Retrieved items: {}", items_string); // Log the retrieved items
        format!("Your name log: {}", items_string)
    },
    Err(e) => {
        eprintln!("Failed to fetch data from the database: {}", e);
        format!("Error: {}", e)
    }
}
}

#[tauri::command]
fn get_table_schedule(app_handle: AppHandle) -> String {

match app_handle.db(|db| database::get_table_schedule(db)) {
    Ok(json_string) => {
        info!("Retrieved table: {}", json_string); // Log the retrieved items
        json_string
    },
    Err(e) => {
        eprintln!("Failed to fetch get table schedule from the database: {}", e);
        format!("Error: {}", e)
    }
}
}

#[tauri::command]
fn get_employees(app_handle: AppHandle)-> String {

    match app_handle.db(|db| database::get_employees(db)) {
        Ok(json_string) => {
            info!("Retrieved table: {}", json_string); // Log the retrieved items
            json_string
        },
        Err(e) => {
            eprintln!("Failed to fetch get employees from the database: {}", e);
            format!("Error: {}", e)
        }
    }
}

#[tauri::command]
fn set_employee(employee: database::Employee, state: State<'_, AppState>) -> Result<String, String> {
    let mut db = state.db.lock().unwrap();
    if let Some(ref mut conn) = *db {
        match set_employee(conn, &employee) {
            Ok(id) => Ok(format!("Employee saved successfully with id: {}", id)),
            Err(e) => Err(format!("Failed to save employee: {}", e)),
        }
    } else {
        Err("Database connection not available".into())
    }
}


fn main() {

    env_logger::init();
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = Arc::new(app.handle());
            
            // Initialize database
            let db = database::initialize_database(&app_handle).expect("Failed to initialize database");
            
            // Manage AppState
            app.manage(AppState {
                db: std::sync::Mutex::new(Some(db)),
            });

            let app_handle_clone = Arc::clone(&app_handle);

            // Run update_schedule immediately
            if let Err(e) = update_schedule(&app_handle_clone) {
                eprintln!("Error updating schedule on startup: {:?}", e);
            }

            // Run the update_schedule in a separate thread
            thread::spawn(move || {
                loop {
                    // Sleep until the next 1 AM
                    let now = Utc::now();
                    let next_run = (now + chrono::Duration::days(1))
                        .date_naive()
                        .and_hms_opt(1, 0, 0)
                        .unwrap();

                    let next_run_utc = next_run.and_utc();
                    let duration_until_next_run = next_run_utc - now;
                    thread::sleep(duration_until_next_run.to_std().unwrap());

                    // Run the update_schedule function
                    if let Err(e) = update_schedule(&app_handle_clone) {
                        eprintln!("Error updating schedule: {:?}", e);
                    }
                }
            });
           
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_table_schedule, get_employees, set_employee])
        .run(tauri::generate_context!())
        .expect("Error while running application");
}