import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "model",
    headerName: "Model",
    width: 200,
    align: "left",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 150,
    align: "left",
  },
  {
    field: "user",
    headerName: "User",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

const Assets = () => {
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios(
        "https://653145304d4c2e3f333cc503.mockapi.io/api/assets"
      );
      setData(result.data);
    })();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Assets;
