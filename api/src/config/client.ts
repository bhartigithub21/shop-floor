import { NtlmClient } from "axios-ntlm";
// import dotenv from "dotenv";
// dotenv.config();

const cnf = {
  username: process.env.NTML_USERNAME || "",
  password: process.env.NTML_PASSWORD || "",
  domain: process.env.NTML_DOMAIN || "",
  workstation: "",
};

export const client = NtlmClient(cnf);

export const getCompanies = async () => {
  try {
    console.log(cnf);

    const response = await client.get(
      "http://172.16.8.211:7258/EIPPL/api/v2.0/companies",
    );

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};
