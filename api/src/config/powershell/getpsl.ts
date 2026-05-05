import { exec } from "child_process";

export const getData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cmd = `
    Invoke-RestMethod -Uri "http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/psls?\$top=70" -Method Get -UseDefaultCredentials |
    ConvertTo-Json -Depth 10
    `;

    exec(`powershell -Command "${cmd}"`, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout as string);
    });
  });
};
