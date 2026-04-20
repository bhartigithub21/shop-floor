async function getAccessToken() {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID || "",
        client_secret: process.env.CLIENT_SECRET || "",
        scope: "https://api.businesscentral.dynamics.com/.default",
      }),
    },
  );

  const data = await response.json();
  return data.access_token;
}
