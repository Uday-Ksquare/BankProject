import React, { useContext, useEffect, useState } from "react";
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
import { GlPeriodContext } from "../Contexts/GlPeriodContext";

const DueToDueFormOtherNonEccuPage = () => {
  const [worksheet, setWorksheet] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // read from URL, fallback defaults
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10); // API expects 1-based
  const sizeFromUrl = parseInt(searchParams.get("pageSize") || "10", 10);

  const [page, setPage] = useState(pageFromUrl - 1); // MUI is 0-based
  const [rowsPerPage, setRowsPerPage] = useState(sizeFromUrl);
  const { glPeriod } = useContext(GlPeriodContext);
  useEffect(() => {
    getScreensData(
      "/scr_supp_c_due_to_and_due_from_other_non_eccu",
      glPeriod,
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
        period: glPeriod,
      });
    });
  }, [page, rowsPerPage, setSearchParams, glPeriod]);
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
              <TableCell style={{ width: "50%" }} sx={headerCellStyles}>
                Description
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Other Non ECCU Current Period
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Other Non ECCU Foreign Currency
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

export default DueToDueFormOtherNonEccuPage;
