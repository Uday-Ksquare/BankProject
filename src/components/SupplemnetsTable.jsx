// components/SettlementAccountsTable.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import TableHeadingCard from "./TableHeadingCard";
import ExpandableRowTable from "./ExpandableRowTable";

const cellStyles = {
  border: "1px solid #aaa",
  padding: "6px",
  fontSize: "14px",
};
const headerCellStyles = {
  ...cellStyles,
  fontWeight: "bold",
  backgroundColor: "#dce6f1",
};

const SupplemnetsTable = ({ endpoint, title, subtitle }) => {
  const [worksheet, setWorksheet] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = (pageNumber = 0, pageSize = 10) => {
    axios
      .get(`${endpoint}?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`)
      .then((res) => setWorksheet(res?.data || {}))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, endpoint]);

  return (
    <Box
      p={2}
      sx={{
        bgcolor: "#fff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <TableHeadingCard headingOne={title} SubHeading={subtitle} />
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyles}>Description</TableCell>
              <TableCell sx={headerCellStyles} align="right">
                Current Period
              </TableCell>
              <TableCell sx={headerCellStyles} align="right">
                FOREIGN CURRENCY
              </TableCell>
              <TableCell sx={headerCellStyles} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(worksheet?.screens || []).map((row) => (
              <ExpandableRowTable key={row.conceptId} row={row} />
            ))}
          </TableBody>
        </Table>
      </Paper>
      <TablePagination
        component="div"
        count={worksheet?.totalItems || 0}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
};

export default SupplemnetsTable;
