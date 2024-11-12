import express from "express";
import { login, logout, session } from '../controllers/authController.js'
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();


//LOGIN
router.post("/", login)

//LOGOUT
router.delete("/", authenticate, logout)

//SESSION
router.get("/", authenticate, session)

export default router;