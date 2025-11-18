const mysql = require("mysql2");
//koneksi mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mancingkubaru"
});

db.connect(err => {
    if (err) {
        console.log("gagal connect ke database", err);
        return;
    }
    console.log("mysql terhubung....");
});

module.exports = db;