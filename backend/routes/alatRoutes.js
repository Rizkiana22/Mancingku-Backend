import express from "express";
import { showAlat, addAlat, editAlat, removeAlat } from "../controllers/alatController.js";

const router = express.Router();

router.get("/", showAlat);
router.post("/", addAlat);
router.put("/:id", editAlat);
router.delete("/:id", removeAlat);

export default router;
