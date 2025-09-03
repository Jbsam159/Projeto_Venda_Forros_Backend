import {Router} from "express"
import { createOrder, getAllOrders, getOrderHistory, reorder } from "../controllers/OrderController.js"
import {authenticate} from "../middleware/authMiddleware.js"

const router = Router()

router.use(authenticate)

router.post("/add", createOrder)
router.get("/all", getAllOrders)
router.get("/history", getOrderHistory)
router.post("/:orderId/reorder", reorder)

export default router