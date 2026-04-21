import { NtlmClient } from "axios-ntlm";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const cnf = {
  username: process.env.NTML_USERNAME || "",
  password: process.env.NTML_PASSWORD || "",
  domain: process.env.NTML_DOMAIN || "",
  workstation: "VM-S1",
};

// Explicitly use an Agent with keepAlive enabled.
// This is critical for NTLM's multi-step handshake.
export const client = NtlmClient(cnf, {
  httpAgent: new http.Agent({ keepAlive: true }),
});

export const getCompanies = async () => {
  try {
    console.log(cnf);

    const url =
      "http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/psls?$top=5";

    const response = await client.get(url);

    console.log("Data received:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data,
      );
    } else {
      console.error("Request Error:", error.message);
    }
    throw error;
  }
};
