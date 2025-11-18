import db from "../config/db.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email dan password wajib diisi" });

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Error cek email" });

        if (results.length > 0)
            return res.status(400).json({ message: "Email sudah terdaftar" });

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: "Gagal enkripsi password" });

            db.query(
                "INSERT INTO users (email, password) VALUES (?, ?)",
                [email, hash],
                err2 => {
                    if (err2) return res.status(500).json({ message: "Gagal simpan user" });

                    res.json({ message: "Registrasi berhasil!" });
                }
            );
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email dan password wajib diisi" });

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Error database" });

        if (results.length === 0)
            return res.status(400).json({ message: "Email salah" });

        const user = results[0];

        bcrypt.compare(password, user.password, (err2, match) => {
            if (err2) return res.status(500).json({ message: "Error verifikasi password" });

            if (!match)
                return res.status(400).json({ message: "Password salah" });

            res.json({
                message: "Login berhasil",
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        });
    });
};
