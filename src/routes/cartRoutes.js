import {Router} from "express"
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/CartController.js"
import {authenticate} from "../middleware/authMiddleware.js"

const router = Router()

router.use(authenticate)
router.post("/add", addToCart)
router.get("/", getCart)
router.delete("/delete/:productId", removeFromCart)
router.put("/update", updateCartItem)

export default router