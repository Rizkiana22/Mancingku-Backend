import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3000;
console.log("🔥 SERVER.JS INI DIPANGGIL 🔥");


app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di port ${PORT}`);
});