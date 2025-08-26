// importando Router do Express
import {Router} from "express"
import { createProduct, getAllProducts, getProductById } from "../controllers/ProductController.js"
import upload from "../middleware/upload.js"

const router = Router()

router.post("/add", upload.single("image"), createProduct)
router.get("/all", getAllProducts)
router.get("/find/:id", getProductById)


export default router