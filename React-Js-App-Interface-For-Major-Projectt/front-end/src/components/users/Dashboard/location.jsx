import React, { useState, useEffect } from "react";
import axios from 'axios';
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
import { FaBusAlt, FaCar } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { GiTrafficLightsRed } from "react-icons/gi";
import "./location.css"; // Assuming you have styles in admin.css

const Admin = () => {
  const [time, setTime] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);
  const [totalBuses, setTotalBuses] = useState(0);
  const [east, setEast] = useState({ cars: 0, bikes: 0, buses: 0 });
  const [west, setWest] = useState({ cars: 0, bikes: 0, buses: 0 });
  const [north, setNorth] = useState({ cars: 0, bikes: 0, buses: 0 });
  const [south, setSouth] = useState({ cars: 0, bikes: 0, buses: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dash/fetch-data/");
        const data = response.data.data; // Assuming your API response is structured as { data: [...] }
        
        // Aggregate totals for each time interval and calculate overall totals
        const { aggregatedData, totalVehicles, totalCars, totalBikes, totalBuses, directions } = aggregateDataByTime(data);

        // Update state with aggregated data and totals
        setTime(aggregatedData);
        setTotalVehicles(totalVehicles);
        setTotalCars(totalCars);
        setTotalBikes(totalBikes);
        setTotalBuses(totalBuses);

        // Update state with direction data
        setEast(directions.east);
        setWest(directions.west);
        setNorth(directions.north);
        setSouth(directions.south);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 2000); // Fetch data every 20 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);
  
  useEffect(() => {
    console.log("Time state:", time);
  }, [time]);

  // Function to aggregate data by time and calculate totals
  const aggregateDataByTime = (data) => {
    const aggregatedData = {};
    let totalVehicles = 0;
    let totalCars = 0;
    let totalBikes = 0;
    let totalBuses = 0;
    const directions = {
      east: { cars: 0, bikes: 0, buses: 0 },
      west: { cars: 0, bikes: 0, buses: 0 },
      north: { cars: 0, bikes: 0, buses: 0 },
      south: { cars: 0, bikes: 0, buses: 0 },
    };

    // Aggregate data by time
    data.forEach(item => {
      const timeKey = item.time;
      if (aggregatedData[timeKey]) {
        aggregatedData[timeKey].total_vehicles += item.total_vehicles;
        aggregatedData[timeKey].total_cars += item.cars;
        aggregatedData[timeKey].total_bikes += item.bikes;
        aggregatedData[timeKey].total_buses += item.buses;
      } else {
        aggregatedData[timeKey] = {
          time: timeKey,
          total_vehicles: item.total_vehicles,
          total_cars: item.cars,
          total_bikes: item.bikes,
          total_buses: item.buses,
        };
      }
      // Update overall totals
      totalVehicles += item.total_vehicles;
      totalCars += item.cars;
      totalBikes += item.bikes;
      totalBuses += item.buses;

      // Update direction totals
      if (item.camera === 'cam_A') {
        directions.east.cars += item.cars;
        directions.east.bikes += item.bikes;
        directions.east.buses += item.buses;
      } else if (item.camera === 'cam_B') {
        directions.west.cars += item.cars;
        directions.west.bikes += item.bikes;
        directions.west.buses += item.buses;
      } else if (item.camera === 'cam_C') {
        directions.north.cars += item.cars;
        directions.north.bikes += item.bikes;
        directions.north.buses += item.buses;
      } else if (item.camera === 'cam_D') {
        directions.south.cars += item.cars;
        directions.south.bikes += item.bikes;
        directions.south.buses += item.buses;
      }
    });

    // Convert object to array for easier rendering in charts
    const aggregatedArray = Object.values(aggregatedData);

    return { aggregatedData: aggregatedArray, totalVehicles, totalCars, totalBikes, totalBuses, directions };
  };

  return (
    <>
      <div className="dasheader">
        <h1>Counter Table</h1>
      </div>
      <hr />
      <div className="dashcontainer">
        <h1>Total Number of Vechiles</h1>
        <div className="holdcontainer flex">
          {/* Total vehicles section */}
          <div className="total-vehicles">
            <p>Total vehicles</p>
            <h1>{totalVehicles}</h1>
          </div>
          <GiTrafficLightsRed fill="white" size={120} />

          {/* Vehicle info section */}
          <div className="vehicle-info">
            <div className="holdcontainer veh">
              <div className="vehhlogo"><FaBusAlt fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Bus </p>
                <h1>{totalBuses}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>{east.buses}</span> </p>
                <p>West :<span>{west.buses}</span> </p>
                <p>North :<span>{north.buses}</span> </p>
                <p>South :<span>{south.buses}</span> </p>
              </div>
            </div>
            <div className="holdcontainer veh">
              <div className="vehhlogo"><FaCar fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Car </p>
                <h1>{totalCars}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>{east.cars}</span> </p>
                <p>West :<span>{west.cars}</span> </p>
                <p>North :<span>{north.cars}</span> </p>
                <p>South :<span>{south.cars}</span> </p>
              </div>
            </div>
            <div className="holdcontainer veh">
              <div className="vehhlogo"><RiMotorbikeFill fill="white" size={56} /></div>
              <div className="total-bus">
                <p>Total Bikes </p>
                <h1>{totalBikes}</h1>
              </div>
              <div className="everyside">
                <p>East:<span>{east.bikes}</span> </p>
                <p>West :<span>{west.bikes}</span> </ p>
                <p>North :<span>{north.bikes}</span> </ p>
                <p>South :<span>{south.bikes}</span> </ p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Admin;
