import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log("gagal connect ke database", err);
        return;
    }
    console.log("mysql terhubung...");
});

export default db;
