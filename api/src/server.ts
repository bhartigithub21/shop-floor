import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { getCompanies } from "./config/client";
import callAPI from "./config/basicAuth";
dotenv.config();
import authRoter from "./routes/auth";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript 🚀" });
});

app.get("/companies", async (req: Request, res: Response) => {
  try {
    const data = await getCompanies();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

app.get("/test", (req: Request, res: Response) => {
  callAPI()
    .then(() => res.json({ message: "API call successful" }))
    .catch((error) =>
      res.status(500).json({ error: error.message || "API call failed" }),
    );
});

app.use("/api/auth", authRoter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
