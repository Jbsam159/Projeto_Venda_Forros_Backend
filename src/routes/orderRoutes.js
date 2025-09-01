import {Router} from "express"
import { createOrder, getAllOrders } from "../controllers/OrderController.js"
import {authenticate} from "../middleware/authMiddleware.js"

const router = Router()

router.use(authenticate)

router.post("/add", createOrder)
router.get("/all", getAllOrders)

export default router