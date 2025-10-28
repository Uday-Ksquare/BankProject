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
import { getHeadersService } from "../services/getHeadersService";
import TableHeadingCard from "../components/TableHeadingCard";
import { GlPeriodContext } from "../Contexts/GlPeriodContext";
import LinearProgressComponent from "../components/LinearProgressComponent";

const PrOnePage = () => {
  const [worksheet, setWorksheet] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { glPeriod } = useContext(GlPeriodContext);

  // read from URL, fallback defaults
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10); // API expects 1-based
  const sizeFromUrl = parseInt(searchParams.get("pageSize") || "10", 10);
  const [headers, setHeaders] = useState([]);
  const reportType = searchParams.get("reportType") || "PR01";

  const [page, setPage] = useState(pageFromUrl - 1); // MUI is 0-based
  const [rowsPerPage, setRowsPerPage] = useState(sizeFromUrl);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getHeadersService("/scr_pr01").then((res) => {
      setHeaders(res || []);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    getScreensData("/scr_pr01",reportType, glPeriod, page + 1, rowsPerPage).then((res) => {
      setWorksheet({
        screens: res.screens || [],
        totalItems: res.totalItems || 0,
      });
      setLoading(false);
      // update URL query string whenever page/size changes
      setSearchParams({
        page: (page + 1).toString(),
        pageSize: rowsPerPage.toString(),
        period: glPeriod,
        reportType: reportType,
      });
    });
  }, [page, rowsPerPage, reportType, glPeriod]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  return (
    <Box
      p={2}
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <TableHeadingCard
        headingOne={headers[0]?.header_text}
        SubHeading={headers[1]?.header_text}
      />
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "50%" }} sx={headerCellStyles}>
                Description
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                Total
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "10%" }}
                align="right"
              >
                of which Restricted Liabilities
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
            {loading ? (
              <LinearProgressComponent/>
            ):(worksheet?.screens || []).map((row) => (
              <ExpandableRowTable
                width={"10%"}
                emptyAllColumns={[
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
                  },
                  {
                    columnName: "ECCU Current Period",
                    columnValue: 0.0,
                    columnPosition: 1,
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

export default PrOnePage;
