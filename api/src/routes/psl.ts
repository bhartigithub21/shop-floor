const { Router } = require("express");
import { getPsl, getScrap } from "../functions/psl";

const router = Router();

router.get("/", getPsl);
router.get("/scrap", getScrap);

export default router;
