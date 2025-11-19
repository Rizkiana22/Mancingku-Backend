import express from "express";
import { showUmpan, addUmpan, editUmpan, removeUmpan } from "../controllers/umpanController.js";

const router = express.Router();

router.get("/", showUmpan);
router.post("/", addUmpan);
router.put("/:id", editUmpan);
router.delete("/:id", removeUmpan);

export default router;
