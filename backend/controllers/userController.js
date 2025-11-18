import db from "../config/db.js";

// Mengambil user berdasarkan ID
export const getUser = (req, res) => {
    const userId = req.params.id;

    db.query(
        "SELECT id, email, name, phone FROM users WHERE id = ?",
        [userId],
        (err, result) => {
            if (err)
                return res.status(500).json({ message: "Gagal mengambil data user" });

            if (result.length === 0)
                return res.status(404).json({ message: "User tidak ditemukan" });

            res.json(result[0]);
        }
    );
};

// Update user profile
export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, phone } = req.body;

    db.query(
        "UPDATE users SET name = ?, phone = ? WHERE id = ?",
        [name, phone, userId],
        err => {
            if (err)
                return res.status(500).json({ message: "Gagal update profil" });

            res.json({ message: "Profil berhasil diperbarui" });
        }
    );
};
