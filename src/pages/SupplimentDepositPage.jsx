import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Button,
  Pagination,
  Stack,
  TablePagination,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import { formatFinancial, formatIndianNumber } from "../utils/consonants";
import EditDrawerComponent from "./EditDrawerComponent";
import { useSearchParams } from "react-router-dom";
import FormTextField from "../components/FormTextField";

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

const groupHeaderStyles = {
  ...cellStyles,
  fontWeight: "bold",
  backgroundColor: "#f2f2f2",
};

// helper: detect extra indent for hierarchy
const getExtraIndent = (desc) => {
  if (!desc) return 0;

  const text = desc.trim();

  if (/^\d+\./.test(text)) return 0; // Numbers like "1.", "2.", "3."

  if (
    /^(\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\)|(?:i|ii|iii|iv|v|vi|vii|viii|ix|x))\.?/i.test(
      text
    )
  ) {
    return 8; // Matches (i), (ii), i., ii., etc.
  }

  if (/^[a-z]\.?/.test(text)) return 4; // Lowercase letters
  if (/^[A-Z]\.?/.test(text)) return 6; // Uppercase letters

  return 2; // fallback
};

const columnWidths = {
  description: "40%", // wider for text
  codeValue: "15%",
  previous: "15%",
  current: "15%",
  variance: "15%",
};

// 🔑 Recursive Row Component
const ExpandableRow = ({ row, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = row.detalles && row.detalles.length > 0;
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editFields, setEditFields] = useState(editingRow?.allColumns || []);

  useEffect(() => {
    setEditFields(editingRow?.allColumns || []);
  }, [editingRow]);

  // handler for updating specific field
  const handleFieldChange = (index, newValue) => {
    setEditFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, columnValue: newValue } : field
      )
    );
  };

  return (
    <>
      {/* parent row */}
      <TableRow>
        <TableCell
          sx={{
            ...(level === 0 ? groupHeaderStyles : cellStyles),
            pl: 2 + level * 4 + getExtraIndent(row.descripcion),
            display: "flex",
            gap: 1,
          }}
        >
          {hasChildren && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
          {row.descripcion || row.detailLabel}
        </TableCell>

        {/* parent row does NOT show codeValue */}

        <TableCell sx={cellStyles} align="right">
          {/* {row?.allColumns[0]?.columnValue} */}
          {formatFinancial(
            row?.allColumns[0]?.columnValue
          )}
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          <div
            style={{
              display: "inline-block",
              padding: "2px 4px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            {/* {row?.allColumns[1]?.columnValue} */}
            {formatFinancial(
              row?.allColumns[1]?.columnValue
            )}
          </div>
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          <div
            style={{
              display: "inline-block",
              padding: "2px 4px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            {formatFinancial(
              row?.allColumns[2]?.columnValue
            )}
          </div>
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          <div
            style={{
              display: "inline-block",
              padding: "2px 4px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            <Button
              onClick={() => {
                setOpenEdit(true);
                setEditingRow(row);
              }}
              size="small"
            >
              Edit
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <EditDrawerComponent
        submitColor={"#254678"}
        row={editingRow}
        open={openEdit}
        title={"Edit Concept"}
        headerColor={"#dce6f1"}
        deleteText={"Delete"}
        cancelText={"Cancel"}
        setOpenEdit={setOpenEdit}
      >
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column", p: 2 }}>
          {editFields.map((field, index) => (
            <FormTextField
              key={index}
              value={field.columnValue}
              name={field.columnName}
              index={index}
              onChange={handleFieldChange}
            />
          ))}

          {/* For debugging */}
          <pre>{JSON.stringify(editFields, null, 2)}</pre>
        </Box>
      </EditDrawerComponent>
      {hasChildren && (
        <TableRow>
          <TableCell
            colSpan={5}
            sx={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={headerCellStyles}>Description</TableCell>
                    {/* <TableCell sx={headerCellStyles} align="right">
                      Code Value
                    </TableCell> */}
                    <TableCell
                      sx={headerCellStyles}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Current Period
                    </TableCell>
                    <TableCell
                      sx={headerCellStyles}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Savings
                    </TableCell>
                    <TableCell
                      sx={[headerCellStyles]}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Fixed Time Non-Negotiable CDs
                    </TableCell>
                    <TableCell
                      sx={[headerCellStyles]}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalles.map((child, i) => (
                    <TableRow key={i}>
                      {/* description */}
                      <TableCell
                        sx={{
                          ...cellStyles,
                          pl:
                            2 +
                            (level + 1) * 4 +
                            getExtraIndent(child.descripcion),
                        }}
                      >
                        {child.descripcion || child.detailLabel}
                      </TableCell>

                      {/* ✅ NOW render codeValue */}
                      {/* <TableCell sx={cellStyles} align="right">
                        {child.codeValue ?? ""}
                      </TableCell> */}

                      <TableCell sx={cellStyles} align="right">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 4px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          {formatFinancial(row?.allColumns[0]?.columnValue)}
                          {/* {row?.allColumns[0]?.columnValue} */}
                          {/* {formatIndianNumber(
                            child.totBalancePrevious ??
                              child.totPreviousBalance ??
                              0
                          )} */}
                        </div>
                      </TableCell>
                      <TableCell sx={cellStyles} align="right">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 4px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          {/* {(() => {
                            const val =
                              child.totBalanceCurrent ??
                              child.totCurrentBalance ??
                              0;
                            return val < 0
                              ? `(${formatIndianNumber(Math.abs(val))})`
                              : formatIndianNumber(val);
                          })()} */}
                          {/* {row?.allColumns[1]?.columnValue} */}
                          {formatFinancial(row?.allColumns[1]?.columnValue)}
                        </div>
                      </TableCell>

                      <TableCell sx={cellStyles} align="right">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 4px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          {formatFinancial(row?.allColumns[2]?.columnValue)}
                        </div>
                      </TableCell>
                      <TableCell sx={cellStyles} align="right">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 4px",
                            fontSize: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          <Button size="small">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const SupplimentDepositPage = () => {
  const [worksheet, setWorksheet] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // read from URL, fallback defaults
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10); // API expects 1-based
  const sizeFromUrl = parseInt(searchParams.get("pageSize") || "10", 10);

  const [page, setPage] = useState(pageFromUrl - 1); // MUI is 0-based
  const [rowsPerPage, setRowsPerPage] = useState(sizeFromUrl);

  const fetchCdssList = (pageNumber = 0, pageSize = 10) => {
    axios
      .get(
        `http://34.51.85.243:8080/api/dynamic/screens/scr_supp_a_deposits/202502?pageNumber=${
          pageNumber + 1
        }&pageSize=${pageSize}`
      )
      .then((response) => {
        setWorksheet(response?.data || {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCdssList(page, rowsPerPage);

    // update URL query string whenever page/size changes
    setSearchParams({
      page: (page + 1).toString(),
      pageSize: rowsPerPage.toString(),
    });
  }, [page, rowsPerPage]);

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
              <TableCell sx={headerCellStyles}>Description</TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Current Period
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Savings
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Fixed Time Non-Negotiable CDs
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(worksheet?.screens || []).map((row) => (
              <ExpandableRow key={row.conceptId} row={row} />
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

export default SupplimentDepositPage;
