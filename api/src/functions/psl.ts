import { Request, Response } from "express";
import { getData } from "../config/powershell/getpsl";

const getPsl = async (req: Request, res: Response) => {
  try {
    const pslData: string = await getData();
    res.status(200).json(JSON.parse(pslData));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PSL data" });
  }
};

export { getPsl };
