import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postcontrollers';
import {
  createPostValidation,
  updatePostValidation,
  getPostValidation,
  deletePostValidation,
} from '../validations/postvalidations';

const router = Router();

router.get('/', getAllPosts);

router.get('/:id', getPostValidation, getPostById);

router.post('/', createPostValidation, createPost);

router.put('/:id', updatePostValidation, updatePost);

router.delete('/:id', deletePostValidation, deletePost);

export default router;