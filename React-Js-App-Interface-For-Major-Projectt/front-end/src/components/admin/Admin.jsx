import React from "react";
import "./admin.css";
import road from "../images/image.png";
import { FaBusAlt,FaCar  } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from 'axios';
import { RiMotorbikeFill } from "react-icons/ri";
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
import datae from "./data.json";
import { GiTrafficLightsRed } from "react-icons/gi";
const Admin = () => {
  const [chartData, setChartData] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);
  const [totalBuses, setTotalBuses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dash/fetch-data/");
        const data = response.data;

        // Update the state with the fetched data
        setTotalVehicles(data.total_vehicles);
        setTotalCars(data.total_cars);
        setTotalBikes(data.total_bikes);
        setTotalBuses(data.total_buses);
        // Assuming your API returns chart data as well
      } catch (error) {
        console.error("Error fetching data:", error);
      } setChartData(datae);
    };

    // Fetch data immediately when the component loads
    fetchData();

    // Fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const datas = [
    {
      time: "1:00",
      bus: 80,
      car: 8,
      mototbike: 100,
    },
    {
      time: "1:30",
      bus: 90,
      car: 80,
      mototbike: 10,
    },
    {
      time: "2:00",
      bus: 90,
      car: 80,
      mototbike: 10,
    },
    {
      time: "3:00",
      bus: 20,
      car: 80,
      mototbike: 10,
    },
    {
      time: "4:00",
      bus: 90,
      car: 30,
      mototbike: 10,
    },
    {
      time: "9:00",
      bus: 70,
      car: 90,
      mototbike: 100,
    },
    {
      time: "5:00",
      bus: 90,
      car: 80,
      mototbike: 10,
    },
    {
      time: "6:00",
      bus: 23,
      car: 38,
      mototbike: 18,
    },
  ];

  return (
    <>
      <div className="dasheader">
        <h1>DashBoard</h1>
      </div>
      <hr />
      <div className="dashcontainer ">
        <h1>Per-hour-Charts </h1>
        <div className="holdcontainer flex">
          <div className="total-vehicles">
            <p>Total vehicles</p>
            <h1>{totalVehicles}</h1>
          </div>
          <GiTrafficLightsRed fill="white" size={120} />

          <div className="vehicle-info ">
            <div className="holdcontainer veh">
              <div className="vehhlogo"><FaBusAlt fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Bus </p>
                <h1>{totalBuses}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>5</span> </p>
                <p>West :<span>5</span> </p>
                <p>North :<span>5</span> </p>
                <p>South :<span>5</span> </p>
              </div>
            </div>
            <div className="holdcontainer veh">
              <div className="vehhlogo"><FaCar fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Car </p>
                <h1>{totalCars}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>5</span> </p>
                <p>West :<span>5</span> </p>
                <p>North :<span>5</span> </p>
                <p>South :<span>5</span> </p>
              </div>
            </div>

            <div className="holdcontainer veh">
              <div className="vehhlogo"><RiMotorbikeFill fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Bikes </p>
                <h1>{totalBikes}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>5</span> </p>
                <p>West :<span>5</span> </p>
                <p>North :<span>5</span> </p>
                <p>South :<span>5</span> </p>
              </div>
            </div>
          </div>
        </div>

        <div className="Per-hour-Charts ">
          <div className="vehiclesPerHrchart">
            <h1>Number of Vehicles </h1>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
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
                <Tooltip cursor={{ stroke: "grey", strokeWidth: 2 }} />
                <Legend />
                <Line
                  type=""
                  dataKey="vehicles"
                  stroke="#2b9374"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="vehiclesinfo">
            <h1>vehicles basis</h1>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={datas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bus" fill="#8884d8" />
                <Bar dataKey="car" fill="#82ca9d" />
                <Bar dataKey="mototbike" fill="red" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
