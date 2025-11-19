import { 
    getAllPosts, 
    getPostBySlug, 
    createPost, 
    updatePost, 
    deletePost 
} from "../models/blogModel.js";

export const showPosts = (req, res) => {
    getAllPosts((err, posts) => {
        if (err) return res.status(500).json({ message: "Gagal ambil data" });
        res.json(posts);
    });
};

export const showPostDetail = (req, res) => {
    const slug = req.params.slug;

    getPostBySlug(slug, (err, post) => {
        if (err) return res.status(500).json({ message: "Gagal ambil data" });

        if (!post) return res.status(404).json({ message: "Post tidak ditemukan" });

        res.json(post);
    });
};

export const addPost = (req, res) => {
    const data = req.body;

    if (!data.title || !data.slug || !data.content)
        return res.status(400).json({ message: "Title, slug dan content wajib diisi" });

    createPost(data, (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menambah post" });
        res.json({ message: "Post berhasil ditambah", result });
    });
};

export const editPost = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    updatePost(data, id, (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal update post" });
        res.json({ message: "Post berhasil diedit", result });
    });
};

export const removePost = (req, res) => {
    const id = req.params.id;

    deletePost(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal hapus post" });
        res.json({ message: "Post berhasil dihapus", result });
    });
};
