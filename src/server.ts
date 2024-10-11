import express, { Request, Response } from 'express';
import { getXataClient } from './xata';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const xata = getXataClient();
app.use(express.json());

// Get all posts
app.get("/api/v1/posts", async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await xata.db.posts.getAll(); // Fetch all records from "posts" table
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Get a post by ID
app.get("/api/v1/posts/:id", async (req: Request, res: Response): Promise<void> => {
    const postID = req.params.id;
    try {
        const post = await xata.db.posts.read(postID); // Fetch post by ID
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        } else {
            res.status(200).json(post);
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Create a new post
app.post("/api/v1/posts", async (req: Request, res: Response): Promise<void> => {
    const { title, content, author } = req.body;

    // Basic validation
    if (!title || !content || !author) {
        res.status(400).json({ message: "Title, content, and author are required" });
        return;
    }

    try {
        const createdPost = await xata.db.posts.create({
            title,
            content,
            author
        });

        res.status(201).json({
            message: "Post created successfully",
            post: createdPost, // Return the created post for further client use
        });
    } catch (error: any) {
        res.status(500).json({ message: "Failed to create post", error: error.message });
    }
});



// Update a post by ID
app.put("/api/v1/posts/:id", async (req: Request, res: Response): Promise<void> => {
    const postID = req.params.id;
    const { title, content, author } = req.body; // Ensure these match your table columns
    try {
        const updatedPost = await xata.db.posts.update(postID, {
            title,
            content,
            author
        }); // Update post

        if (!updatedPost) {
            res.status(404).json({ message: "Post not found" });
        } else {
            res.status(200).json({ message: "Post updated successfully" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Delete a post by ID
app.delete("/api/v1/posts/:id", async (req: Request, res: Response): Promise<void> => {
    const postID = req.params.id;
    try {
        const deletedPost = await xata.db.posts.delete(postID); // Delete post

        if (!deletedPost) {
            res.status(404).json({ message: "Post not found" });
        } else {
            res.status(200).json({ message: "Post deleted successfully" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
