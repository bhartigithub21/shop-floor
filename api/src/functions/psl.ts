import { Request, Response } from "express";
import { getData, getScrapData } from "../config/powershell/getpsl";

const getPsl = async (req: Request, res: Response) => {
  try {
    const pslData: string = await getData();
    res.status(200).json(JSON.parse(pslData));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PSL data" });
  }
};

const getScrap = async (req: Request, res: Response) => {
  try {
    const scrapData: string = await getScrapData();
    res.status(200).json(JSON.parse(scrapData));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scrap data" });
  }
};

export { getPsl, getScrap };
