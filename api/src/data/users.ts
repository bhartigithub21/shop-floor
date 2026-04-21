import { userreadFile } from "../config/userFileControl";
import { User } from "../types/user";

let users: User[] = [];

const initUsers = async () => {
  users = await userreadFile();
};
initUsers();

export { users };
