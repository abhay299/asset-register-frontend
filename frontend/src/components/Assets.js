import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
// import io from "socket.io-client";

const Assets = () => {
  const [data, setData] = useState([]);

  // Fetch initial data from the API
  const getDevice = async () => {
    try {
      const res = await publicRequest.get("/devices/");
      setData(res.data);
    } catch (err) {
      console.log(`Error fetching data due to: ${err}`);
    }
  };

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    // Establish a WebSocket connection to your backend
    // const socket = io("http://localhost:5000/api/devices");

    // // Listen for data updates from the WebSocket
    // socket.on("dataUpdate", (updatedData) => {
    //   console.log("Data update received:", updatedData);

    //   // Update the data in React state
    //   setData(updatedData);
    // });

    // Call the function to fetch initial data
    getDevice();

    // Polling interval (e.g., every 10 seconds)
    const intervalId = setInterval(getDevice, 5000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  console.log("DATA =>", data);

  return (
    <div className="">
      <h1 className="bg-blue-200 text-3xl font-bold p-2">Assets</h1>
      <table className="table-auto w-full border-collapse border">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-2 border border-slate-400">Host Name</th>
            <th className="px-4 py-2 border border-slate-400">Manufacturer</th>
            <th className="px-4 py-2 border border-slate-400">Model</th>
            <th className="px-4 py-2 border border-slate-400">OS Name</th>
            <th className="px-4 py-2 border border-slate-400">RAM (GB)</th>
            <th className="px-4 py-2 border border-slate-400">
              Disk Space (GB)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="odd:bg-slate-200">
              <td className="px-4 py-2 border border-slate-400">
                {item.hostName}
              </td>
              <td className="px-4 py-2 border border-slate-400">
                {item.manufacturer}
              </td>
              <td className="px-4 py-2 border border-slate-400">
                {item.model}
              </td>
              <td className="px-4 py-2 border border-slate-400">
                {item.osName}
              </td>
              <td className="px-4 py-2 border border-slate-400">
                {item.totalPhysicalMemoryGB}
              </td>
              <td className="px-4 py-2 border border-slate-400">
                {item.totalDiskSizeGB}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
