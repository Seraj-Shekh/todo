import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), "utf8").toString();
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedpassword) => {
        pool.query('INSERT INTO account (email,password) VALUES ($1, $2) ', [email, hashedpassword])

    })
}
export { initializeTestDb, insertTestUser }