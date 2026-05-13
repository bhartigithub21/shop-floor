import { Request, Response } from "express";
import { getApiData } from "../config/powershell/test";

export const getChartData = async (req: Request, res: Response) => {
  try {
    const res1 = await getApiData();
    const data = JSON.parse(res1);
    res.json(data);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
};
