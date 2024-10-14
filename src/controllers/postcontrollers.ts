import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { getXataClient } from '../xata';

const xata = getXataClient();

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await xata.db.posts.getAll();
    res.status(200).json(posts);
  } catch (error: any) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const postID = req.params.id;
  try {
    const post = await xata.db.posts.read(postID);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(200).json(post);
    }
  } catch (error: any) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { title, content, author } = req.body;
  try {
    const createdPost = await xata.db.posts.create({
      title,
      content,
      author,
    });
    res.status(201).json({
      message: 'Post created successfully',
      post: createdPost,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const postID = req.params.id;
  const { title, content, author } = req.body;
  try {
    const updatedPost = await xata.db.posts.update(postID, {
      title,
      content,
      author,
    });
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(200).json({
        message: 'Post updated successfully',
        updatedPost,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const postID = req.params.id;
  try {
    const deletedPost = await xata.db.posts.delete(postID);
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (error: any) {
    next(error);
  }
};