import { exec } from "child_process";
import { TempApiData } from "../../types/tempapi";

export const postData = (data: TempApiData): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const cmd = `powershell -NoProfile -Command "(Invoke-WebRequest -Uri 'http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/tests' -Method Post -Body '{\\"No\\":\\"${data.no}\\",\\"DocNo\\":\\"${data.docNo}\\",\\"lineNo\\":\\"${data.lineNo}\\",\\"userName\\":\\"${data.userName}\\",\\"startDate\\":\\"${data.startDate}\\",\\"endDate\\":\\"${data.endDate}\\",\\"startTime\\":\\"${data.startTime}\\",\\"endTime\\":\\"${data.endTime}\\",\\"scrapCode\\":\\"${data.scrapCode}\\",\\"scrapQnt\\":${data.scrapQnt},\\"downDate\\":\\"${data.downDate}\\",\\"downstartTime\\":\\"${data.downstartTime}\\",\\"downEndTime\\":\\"${data.downEndTime}\\",\\"downReason\\":\\"${data.downReason}\\",\\"setupTime\\":${data.setupTime},\\"Output\\":${data.output},\\"User\\":\\"${data.user}\\"}' -ContentType 'application/json' -UseDefaultCredentials -UseBasicParsing).Content"`;

    exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        console.error("err:", err);
        console.error("stderr:", stderr);
        return reject(stderr || err.message);
      }

      if (!stdout) {
        return reject("Empty stdout test");
      }

      resolve(stdout.trim());
    });
  });
};

export const getApiData = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const cmd = `powershell -NoProfile -Command "(Invoke-WebRequest -Uri 'http://172.16.8.211:7258/EIPPL/api/bapiya/demo/v1.0/companies(a1f36400-efd6-ef11-8292-00155d010600)/tests' -Method Get -UseDefaultCredentials -UseBasicParsing).Content"`;

    exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        console.error("err:", err);
        console.error("stderr:", stderr);
        return reject(stderr || err.message);
      }

      if (!stdout) {
        return reject("Empty stdout test");
      }

      resolve(stdout.trim());
    });
  });
};
