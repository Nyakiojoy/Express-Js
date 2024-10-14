import { body, param } from 'express-validator';

export const createPostValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
];

export const updatePostValidation = [
  param('id').isString().withMessage('Post ID must be a string'),
  body('title').optional().isString(),
  body('content').optional().isString(),
  body('author').optional().isString(),
];

export const getPostValidation = [
  param('id').isString().withMessage('Post ID must be a string'),
];

export const deletePostValidation = [
  param('id').isString().withMessage('Post ID must be a string'),
];