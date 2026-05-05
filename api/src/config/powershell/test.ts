import { exec } from "child_process";

export const postData = (
  no: String,
  output: number,
  user: String,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const cmd = `powershell -NoProfile -Command "$body = @{ No = '${no}'; Output = ${output}; User = '${user}' } | ConvertTo-Json -Depth 10; (Invoke-RestMethod -Uri 'http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/tests' -Method Post -Body $body -ContentType 'application/json' -UseDefaultCredentials) | ConvertTo-Json -Depth 10"`;

    exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        console.error("err:", err);
        console.error("stderr:", stderr);
        return reject(stderr || err.message);
      }

      if (!stdout) {
        return reject("Empty stdout");
      }

      resolve(stdout.trim());
    });
  });
};
