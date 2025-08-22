import axios from "axios";
import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";

const DdaLstPage = () => {
  const [ddaList, setDdaList] = React.useState([]);
  const fetchCdssList = () => {
    axios
      .get("http://138.128.246.29:8080/api/dynamic/screens/scr_ddalst/202502")
      .then((response) => {
        setDdaList(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cleanData = useMemo(() => {
    return ddaList.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          value === null || value === undefined || value === "" ? "-" : value,
        ])
      )
    );
  }, [ddaList]);
  useEffect(() => {
    fetchCdssList();
  }, []);
  // dynamically generate columns from keys of first row
  const columns = useMemo(() => {
    if (cleanData.length === 0) return [];
    return Object.keys(cleanData[0]).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, [cleanData]);
  const table = useMaterialReactTable({
    columns,
    data: cleanData,
    initialState: {
      density: "compact",
    },
  });
  return (
    <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "10px", width: "100%", p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DdaLstPage;
