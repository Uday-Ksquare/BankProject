import { Box } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";

const Table = ({ tableData, totalItems, onPageChange, pageNumber, pageSize }) => {
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
    manualPagination: true,
    rowCount: totalItems,
    state: {
      pagination: { pageIndex: pageNumber - 1, pageSize },
    },
    // ✅ FIX: MRT passes an updater (object), not separate args
    onPaginationChange: (updater) => {
      const { pageIndex, pageSize: newSize } =
        typeof updater === "function"
          ? updater({ pageIndex: pageNumber - 1, pageSize })
          : updater;

      // reset to page 1 when pageSize changes
      if (newSize !== pageSize) {
        onPageChange(1, newSize);
      } else {
        onPageChange(pageIndex + 1, newSize);
      }
    },
    initialState: { density: "compact" },
  });

  return (
    <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "10px", width: "100%", p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Table;