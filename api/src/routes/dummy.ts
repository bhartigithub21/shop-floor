import { Router } from "express";
import { datJson } from "../data/dummyData";
import { postData } from "../config/powershell/test";
const router = Router();

router.get("/psl", (req, res) => {
  res.json(datJson.value);
});
router.get("/test", async (req, res) => {
  const result = await postData({
    no: "123",
    docNo: "456",
    lineNo: "1",
    userName: "John Doe",
    startDate: "2024-01-01",
    endDate: "2024-01-02",
    startTime: "09:00:00",
    endTime: "17:00:00",
    scrapCode: "SC123",
    scrapQnt: "10",
    downDate: "2024-01-01",
    downstartTime: "10:00:00",
    downEndTime: "11:00:00",
    downReason: "Machine Maintenance",
    setupTime: "30",
    output: "100",
    user: "JDoe",
  });
  res.json(result);
});

export default router;
