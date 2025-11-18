const db = require("../config/db");
const bcrypt = require("bcrypt");


//register / sign up
exports.register = (req, res) => {
    const { email, password } = req.body;
    //jika email atau password tidak diisi dari form 
    if (!email || !password)
        return res.status(400).json({ message: "Email dan password wajib diisi" });

    //cek apakah email sudah pernah dipakai /  sudah pernah daftar
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        //jika terjadi error saat query
        if (err) return res.status(500).json({ message: "Error cek email" });

        //jika hasil query > 0 berarti email sudah pernah digunakan
        if (results.length > 0)
            return res.status(400).json({ message: "Email sudah terdaftar" });

        //enkripsi password sebelum disimpan
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: "Gagal enkripsi password" });

            //simpan data user ke database
            db.query(
                "INSERT INTO users (email, password) VALUES (?, ?)",
                [email, hash],
                err2 => {
                    //jika gagal inser
                    if (err2) return res.status(500).json({ message: "Gagal simpan user" });

                    //jika berhasil
                    res.json({ message: "Registrasi berhasil!" });
                }
            );
        });
    });
};

//saat login atau sign in
exports.login = (req, res) => {
    const { email, password } = req.body;

    //jika email dan password tidak diisi dari form
    if (!email || !password)
        return res.status(400).json({ message: "Email dan password wajib diisi" });

    //query untuk mencari email yang sesuai
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Error database" });

        //jika email tidak ditemukan 
        if (results.length === 0)
            return res.status(400).json({ message: "Email salah" });


        const user = results[0];

        //membandingkan password yang diketik dan password yang sudah di hash di database
        bcrypt.compare(password, user.password, (err2, match) => {
            //jika error saat dicompare
            if (err2) return res.status(500).json({ message: "Error verifikasi password" });

            //jika password salah
            if (!match)
                return res.status(400).json({ message: "Password salah" });

            //jika password benar
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
