import React, {  useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";

const Table = ({ tableData }) => {
  const cleanData = useMemo(() => {
    return tableData.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          value === null || value === undefined || value === "" ? "-" : value,
        ])
      )
    );
  }, [tableData]);
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

export default Table;
