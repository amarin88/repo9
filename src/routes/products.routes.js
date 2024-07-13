import { Router } from "express";// Import del router de Express
import productDao from "../dao/mongoDao/product.dao.js"; //Import el Dao de los productos
import { passportCall, authorization } from "../middlewares/passport.middleware.js";//Import el middleware de rol de usuario
import { productDataValidator } from "../validators/productData.validator.js";//Import el validador de productos
import productsController from "../controllers/products.controllers.js";//Import controller de productos


const router = Router();//Creación del router

router.get("/", productsController.getAllProducts );//Ruta para obtener todos los productos

router.get("/:pid", productsController.getProductsById);//Ruta para obtener un producto por su ID

router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, productsController.createProduct);//Ruta para agregar un nuevo producto

router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.updateProduct);//Ruta para actualizar un producto existente

router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsController.deleteProduct); //Ruta para eliminar un producto por su ID

export default router;//Export del router
