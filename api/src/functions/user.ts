import { Request, Response } from "express";
import { userreadFile, userwriteFile } from "../config/userFileControl";
import { User } from "../types/user";
import jwt from "jsonwebtoken";
import { users } from "../data/users";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.id === username && u.password === password);
  if (user) {
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

const signup = async (req: Request, res: Response) => {
  const { username, password, phone, name } = req.body;
  if (users.find((u) => u.id === username)) {
    return res
      .status(400)
      .json({ success: false, message: "User ID already exists" });
  }
  const newUser: User = { id: username, name, password, phone };
  users.push(newUser);
  await userwriteFile(users);
  res.json({ success: true, message: "User created successfully" });
};

const getUsers = async (req: Request, res: Response) => {
  res.json(users);
};

export { login, signup, getUsers };
