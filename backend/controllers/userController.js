const db = require("../config/db");


//mengambil user berdasarkan id
exports.getUser = (req, res) => {
    const userId = req.params.id;
    //ambil id user dari url

    db.query(
        "SELECT id, email, name, phone FROM users WHERE id = ?",
        [userId],
        (err, result) => {
            if (err)
                //jika error dari mysql
                return res.status(500).json({ message: "Gagal mengambil data user" });

                //jika tidak ditemukan
            if (result.length === 0)
                return res.status(404).json({ message: "User tidak ditemukan" });

            //kirimkan data user
            res.json(result[0]);
        }
    );
};

//update user profile
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    //ambil id user

    const { name, phone } = req.body;
    //ambil data yang ingin di update

    //update 
    db.query(
        "UPDATE users SET name = ?, phone = ? WHERE id = ?",
        [name, phone, userId],
        err => {
            if (err)
                //jika gagal update di database
                return res.status(500).json({ message: "Gagal update profil" });

                //jika sukses
            res.json({ message: "Profil berhasil diperbarui" });
        }
    );
};
