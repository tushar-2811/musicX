import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
export const sqlConnection = neon(process.env.DB_URL);
export async function initDB() {
    try {
        await sqlConnection `
         CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
       `;
        await sqlConnection `
         CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
       `;
        console.log("Datbase Initialized Successfully");
    }
    catch (error) {
        console.log("Error while initializing db", error);
    }
}
