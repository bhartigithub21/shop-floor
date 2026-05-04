import { exec } from "child_process";

export const postData = () => {
  return new Promise((resolve, reject) => {
    const cmd = `
    $body = @{ field1 = "value1"; field2 = "value2" } | ConvertTo-Json;
    Invoke-RestMethod -Uri "http://localhost:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/tests" -Method Post -Body $body -ContentType "application/json" -UseDefaultCredentials
    `;

    exec(`powershell -Command "${cmd}"`, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout);
    });
  });
};
