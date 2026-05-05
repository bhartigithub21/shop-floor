import { Router } from "express";
import { datJson } from "../data/dummyData";
const router = Router();

router.get("/psl", (req, res) => {
  res.json(datJson.value);
});

export default router;
