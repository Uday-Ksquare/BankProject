import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { headerCellStyles } from "../utils/consonants";
import { useSearchParams } from "react-router-dom";
import ExpandableRowTable from "../components/ExpandableRowTable";
import { getScreensData } from "../services/getScreensData";

const DueToBankspage = () => {
  const [worksheet, setWorksheet] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // read from URL, fallback defaults
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10); // API expects 1-based
  const sizeFromUrl = parseInt(searchParams.get("pageSize") || "10", 10);

  const [page, setPage] = useState(pageFromUrl - 1); // MUI is 0-based
  const [rowsPerPage, setRowsPerPage] = useState(sizeFromUrl);

  // const fetchCdssList = (pageNumber = 0, pageSize = 10) => {
  //   axios
  //     .get(
  //       `http://34.51.85.243:8080/api/dynamic/screens/scr_supp_c_due_to_and_due_from_other_eccu/202502?pageNumber=${
  //         pageNumber + 1
  //       }&pageSize=${pageSize}`
  //     )
  //     .then((response) => {
  //       setWorksheet(response?.data || {});
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    getScreensData(
      "/scr_supp_K1_due_to_banks",
      "202502",
      page + 1,
      rowsPerPage
    ).then((res) => {
      setWorksheet({
        screens: res.screens || [],
        totalItems: res.totalItems || 0,
      });
      // update URL query string whenever page/size changes
      setSearchParams({
        page: (page + 1).toString(),
        pageSize: rowsPerPage.toString(),
      });
    });
  }, [page, rowsPerPage, setSearchParams]);
  // useEffect(() => {
  //   fetchCdssList(page, rowsPerPage);

  //   // update URL query string whenever page/size changes
  //   setSearchParams({
  //     page: (page + 1).toString(),
  //     pageSize: rowsPerPage.toString(),
  //   });
  // }, [page, rowsPerPage, setSearchParams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  return (
    <Box p={2} sx={{ bgcolor: "#FFFFFF", borderRadius: "10px" }}>
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }} sx={headerCellStyles}>
                Description
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Current Account/ Call Account
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Fixed/Time Deposits/Non-negotiable CDs
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Negotiable Certificates of Deposits
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Borrowings
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Repurchase Agreements
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Other
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Balance outstanding
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Collateral Value (EC Equiv)
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(worksheet?.screens || []).map((row) => (
              <ExpandableRowTable
              descriptionWidth={"10%"}
                width={"10%"}
                emptyAllColumns={[
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
                  },
                  {
                    columnName: "ECCU Foreign Currency",
                    columnValue: 0.0,
                    columnPosition: 2,
                  },
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
                  },
                  {
                    columnName: "ECCU Foreign Currency",
                    columnValue: 0.0,
                    columnPosition: 2,
                  },
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
                  },
                  {
                    columnName: "ECCU Foreign Currency",
                    columnValue: 0.0,
                    columnPosition: 2,
                  },
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
                  },
                  {
                    columnName: "ECCU Foreign Currency",
                    columnValue: 0.0,
                    columnPosition: 2,
                  },
                ]}
                key={row.conceptId}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Pagination Control */}
      <TablePagination
        component="div"
        count={worksheet?.totalItems || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
};

export default DueToBankspage;
