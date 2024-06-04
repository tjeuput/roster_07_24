#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
/* where to use this  use crate::commands::get_table_schedule; */
mod database;
mod state; /*why mod */
//mod commands;


use state::{ServiceAccess, AppState};
use tauri::{AppHandle, Manager};
use log::info;


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
        info!("Retrieved items: {}", json_string); // Log the retrieved items
        format!("Your name log: {}", json_string)
    },
    Err(e) => {
        eprintln!("Failed to fetch data from the database: {}", e);
        format!("Error: {}", e)
    }
}
}


fn main() {
    env_logger::init();
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            let db = database::initialize_database(&app_handle).expect("Failed to initialize database");
            app.manage(AppState {
                db: std::sync::Mutex::new(Some(db)),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_table_schedule])
        .run(tauri::generate_context!())
        .expect("Error while running application");
}