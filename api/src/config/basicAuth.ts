const axios = require("axios");

async function callAPI() {
  try {
    const response = await axios.get(
      "http://172.16.8.211:7258/EIPPL/api/v2.0/companies",
      {
        auth: {
          username: "s.bapiya",
          password: "Welcome@123",
        },
      },
    );

    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status:", error.response.status);
      console.log("Error Data:", error.response);
    } else {
      console.log("Error:", error.message);
    }
  }
}

export default callAPI;
