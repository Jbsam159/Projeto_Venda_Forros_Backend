// importando Router do Express
import {Router} from "express"
import { createProduct, getAllProducts, getProductById } from "../controllers/ProductController.js"

const router = Router()

router.post("/add", createProduct)
router.get("/all", getAllProducts)
router.get("/find/:id", getProductById)

export default router