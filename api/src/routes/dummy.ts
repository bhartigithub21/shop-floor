import { Router } from "express";
import { datJson } from "../data/dummyData";
import { postData } from "../config/powershell/test";
import { getChartData } from "../functions/charts";
const router = Router();

router.get("/psl", (req, res) => {
  res.json(datJson.value);
});
router.post("/test", async (req, res) => {
  const { data } = req.body;
  const result = await postData(data);
  res.json(result);
});

router.get("/chart", getChartData);

export default router;
