import React from "react";
import "./admin.css";
import road from "../images/image.png";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import data from "./data.json";

const Admin = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data);
  }, []);

  return (
    <>
      <div className="dasheader">
        <h1>DashBoard</h1>
      </div>
      <hr />
      <div className="dashcontainer">
        <div className="contentas">
          <div>
            <h1>Number of Vehicles per Minute</h1>
            <LineChart
              width={450}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{
                  value: "Time",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Vehicles",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="vehicles"
                stroke="#2b9374"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
