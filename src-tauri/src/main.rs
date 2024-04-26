use rusqlite::{Connection, Result, params};
use tauri::command;

#[command]
fn check_database() -> Result<String, String> {
    let db_path = "EncryptedDb.db";
    let encryption_key = "p6%7P*KJzZpvK@jZS4Xb36hGPGMVuj@U!aDYYq6";

    let conn = match Connection::open(db_path) {
        Ok(conn) => conn,
        Err(_) => return Err("Failed to open database.".to_string()),
    };

    conn.pragma_update(None, "key", &encryption_key).unwrap();

    let count: i32 = conn.query_row(
        "SELECT count(*) FROM sqlite_master WHERE type='table';",
        params![],
        |row| row.get(0),
    ).unwrap();

    if count > 0 {
        Ok("Successfully connected to the database. Tables count: ".to_string() + &count.to_string())
    } else {
        Ok("The database is accessible but contains no tables or the key is incorrect.".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![check_database])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    /* let db_path = "EncryptedDb.db";
    let encryption_key = "p6%7P*KJzZpvK@jZS4Xb36hGPGMVuj@U!aDYYq6";

    // Open the database with the specified path
    let conn = Connection::open(db_path)?;

    // Set the encryption key
    conn.pragma_update(None, "key", &encryption_key)?;

    // Optionally, check the cipher version
    let cipher_version: String = conn.pragma_query_value(None, "cipher_version", |row| row.get(0))?;
    println!("Cipher version used in the database: {}", cipher_version);

    // Perform a test query to ensure everything is working
    let count: i32 = conn.query_row(
        "SELECT count(*) FROM sqlite_master WHERE type='table';",
        params![],
        |row| row.get(0),
    )?;

    if count > 0 {
        println!("Successfully connected to the database. Tables count: {}", count);
    } else {
        println!("The database is accessible but contains no tables or the key is incorrect.");
    }

//Ok(()) */
}