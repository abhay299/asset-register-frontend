import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { publicRequest } from "../requestMethod";

const Assets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from the API
  const getDevice = async () => {
    try {
      const res = await publicRequest.get("/devices/");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(`Error fetching data due to: ${err}`);
    }
  };

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
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
              Total Disk Size (GB)
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Render skeleton loader for thead and tbody while data is loading
            <>
              <tr>
                <td colSpan="6">
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "#D8D9DA" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Skeleton
                    variant="rounded"
                    animation="pulse"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "#9DB2BF" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Skeleton
                    variant="rounded"
                    animation="pulse"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "#D8D9DA" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Skeleton
                    variant="rounded"
                    animation="pulse"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "#9DB2BF" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Skeleton
                    variant="rounded"
                    animation="pulse"
                    width="100%"
                    height={40}
                    sx={{ bgcolor: "#D8D9DA" }}
                  />
                </td>
              </tr>
            </>
          ) : (
            // Render actual data when loaded
            data.map((item) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
