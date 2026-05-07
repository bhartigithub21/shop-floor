import { Router } from "express";
import { login, signup, getUsers, loginToken } from "../functions/user";
import authMiddleware from "../Middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/signup", authMiddleware, signup);
router.get("/users", getUsers);
router.get("/logtok", authMiddleware, loginToken);

export default router;
