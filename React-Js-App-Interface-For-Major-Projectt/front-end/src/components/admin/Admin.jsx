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
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import data from "./data.json";

const Admin = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data);
  }, []);
  const datas = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    <>
      <div className="dasheader">
        <h1>DashBoard</h1>
      </div>
      <hr />
      <div className="dashcontainer dasheader">
        <h1>Per-hour-Charts </h1>
        <div className="Per-hour-Charts ">
          <div className="vehiclesPerHrchart">
            {/* <div> */}
            <h1>Number of Vehicles per Minute</h1>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                // width={450}
                // height={300}
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
            </ResponsiveContainer>
            {/* </div> */}
          </div>

          <div className="vehiclesinfo">
            <h1>vehicles in last 1 hr</h1>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={datas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
