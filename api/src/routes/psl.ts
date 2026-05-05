const { Router } = require("express");
import { getPsl } from "../functions/psl";

const router = Router();

router.get("/", getPsl);

export default router;
