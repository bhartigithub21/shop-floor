import { promises as fs } from "fs";
import path from "path";
import { User } from "../types/user";

const filePath = path.join(__dirname, "../data/users.txt");

export async function userreadFile(): Promise<User[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading file: " + error);
  }
}

export async function userwriteFile(content: User[]): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(content), "utf-8");
  } catch (error) {
    throw new Error("Error writing file: " + error);
  }
}
