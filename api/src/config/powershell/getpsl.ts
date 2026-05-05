import { exec } from "child_process";

export const getData = (): Promise<string> => {
  const date = new Date(new Date().setDate(new Date().getDate() - 2));
  const srchDt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return new Promise<string>((resolve, reject) => {
    const cmd = `powershell -NoProfile -Command "(Invoke-WebRequest -Uri 'http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/psls?\$filter=ScheduleDate%20ge%20${srchDt}&\$top=150' -UseDefaultCredentials -UseBasicParsing).Content"`;
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
