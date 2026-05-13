import { Router } from "express";
import { datJson } from "../data/dummyData";
import { postData } from "../config/powershell/test";
const router = Router();

router.get("/psl", (req, res) => {
  res.json(datJson.value);
});
router.get("/test", async (req, res) => {
  const { data } = req.body;
  const result = await postData(data);
  res.json(result);
});

export default router;
