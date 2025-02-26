import { promises as fs } from 'fs';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import type { Database } from 'sqlite';

const DB_PATH = '/tmp/file.db';
  return fs
    .readFile(filePath, { encoding: 'utf8' })
    .then((content) => {
      const fileName = filePath.split('/').pop() || 'unknown';

      return open({
        filename: DB_PATH,
        driver: sqlite3.Database,
      }).then((db) =>
        ensureTableExists(db, tableName, contentColumnName, fileNameColumnName)
          .then(() =>
            insertContent(db, tableName, contentColumnName, fileNameColumnName, content, fileName),
          )
          .finally(() => db.close()),
      );
    })
    .then((id) => ({ success: true, message: 'File content inserted successfully', id }))
    .catch((error) => ({ success: false, message: `Error: ${error.message}` }));


const insertFileContentToDatabase = async (
  filePath: string,
): Promise<{ success: boolean; message: string; id?: number }> => {

  // Helper function to ensure the table exists
  function ensureTableExists(
    db: Database,
    table: string,
    contentCol: string,
    fileNameCol: string,
  ): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${fileNameCol} TEXT NOT NULL,
      ${contentCol} TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    return db.exec(query);
  }

  // Helper function to insert the content
  function insertContent(
    db: Database,
    table: string,
    contentCol: string,
    fileNameCol: string,
    content: string,
    fileName: string,
  ): Promise<number> {
    const query = `INSERT INTO ${table} (${fileNameCol}, ${contentCol}) VALUES (?, ?)`;
    return db.run(query, [fileName, content]).then((result) => result.lastID || 0);
  }
};

export default insertFileContentToDatabase;
