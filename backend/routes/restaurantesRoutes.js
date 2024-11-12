import express from "express";
import restaurantesController from "../controllers/restaurantesController.js";
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

//CREATE
router.post("/", authenticate, restaurantesController.create);

//Find All
router.get("/", authenticate, restaurantesController.findAll);

//BUSCAR RESTAURANTE POR ID
router.get("/:id", authenticate, restaurantesController.findById)

//Update by id
router.put("/:id", authenticate, restaurantesController.updateById)

//ELIMINAR RESTAURANTE POR ID
router.delete("/:id", authenticate, restaurantesController.deleteById)


export default router;