import {Router} from "express"
import { createOrder, getAllOrders } from "../controllers/OrderController.js"

const router = Router()

router.post("/add", createOrder)
router.get("/all", getAllOrders)

export default router