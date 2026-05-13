import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./Charts.css";

export default function Charts() {
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      // 🔁 Replace with API
      const response = [
        { endDate: "2026-05-01", output: "120" },
        { endDate: "2026-05-01", output: "20" },
        { endDate: "2026-05-02", output: "200" },
        { endDate: "2026-05-03", output: "120" },
        { endDate: "2026-05-03", output: "50" },
        { endDate: "2026-05-04", output: "300" },
      ];

      const formatted = response.map((item) => ({
        ...item,
        output: Number(item.output || 0),
      }));

      setData(formatted);

      const grouped = formatted.reduce((acc, item) => {
        const key = item.endDate;

        if (!acc[key]) {
          acc[key] = {
            endDate: key,
            output: 0,
          };
        }

        acc[key].output += item.output;

        return acc;
      }, {});

      const finalLineData = Object.values(grouped).sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate),
      );

      setLineData(finalLineData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chart-page">
      <div className="chart-header">Output Quantity Chart</div>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="endDate" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="output"
              name="Total Output"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
