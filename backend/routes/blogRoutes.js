import express from "express";
import { 
    showPosts, 
    showPostDetail, 
    addPost, 
    editPost, 
    removePost 
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", showPosts);
router.get("/:slug", showPostDetail);
router.post("/", addPost);
router.put("/:id", editPost);
router.delete("/:id", removePost);

export default router;
