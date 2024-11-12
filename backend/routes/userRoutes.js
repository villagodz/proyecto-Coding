import express from 'express';
import userController from '../controllers/userController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

//CREATE
router.post("/", userController.create);

//Find all
router.get("/", authenticate, userController.findAll)

//FIND BY ID
router.get("/:id", authenticate, userController.findById);

export default router