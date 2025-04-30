import express from "express"
import { userControllers } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { userValidation } from "./user.validation"

const router = express.Router()

router.get("/create-user",validateRequest(userValidation.createUserSchema),userControllers.createUser)

export const userRoutes = router;