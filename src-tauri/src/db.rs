use rusqlite::{Connection, Result, params};
// fn main() -> Result<()> {
//     let db_path = "encr.db";
//     let encryption_key = "Jesus2024";

//     // Open the database with the specified path
//     let conn = Connection::open(db_path)?;

//     // Set the encryption key
//     conn.pragma_update(None, "key", &encryption_key)?;

//     // Optionally, check the cipher version
//     let cipher_version: String = conn.pragma_query_value(None, "cipher_version", |row| row.get(0))?;
//     println!("Cipher version used in the database: {}", cipher_version);

//     // Perform a test query to ensure everything is working
//     let count: i32 = conn.query_row(
//         "SELECT count(*) FROM sqlite_master WHERE type='table';",
//         params![],
//         |row| row.get(0),
//     )?;

//     if count > 0 {
//         println!("Successfully connected to the database. Tables count: {}", count);
//     } else {
//         println!("The database is accessible but contains no tables or the key is incorrect.");
//     }

//     Ok(())
// }