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
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import { formatFinancial, formatIndianNumber } from "../utils/consonants";
import EditDrawerComponent from "./EditDrawerComponent";

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
          {formatFinancial(
            row.totBalancePrevious ?? row.totPreviousBalance ?? 0
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
            {formatFinancial(
              row.totBalanceCurrent ?? row.totCurrentBalance ?? 0
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
            {(() => {
              const val = row.totVariance ?? row.variance ?? 0;
              return val < 0
                ? `(${formatIndianNumber(Math.abs(val))})`
                : formatIndianNumber(val);
            })()}
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
            <Button onClick={() => {
              setOpenEdit(true);
              setEditingRow(row);
            }} size="small">Edit</Button>
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
      />
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
                    <TableCell sx={headerCellStyles} align="right">
                      Code Value
                    </TableCell>
                    <TableCell
                      sx={headerCellStyles}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Previous
                    </TableCell>
                    <TableCell
                      sx={headerCellStyles}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Current
                    </TableCell>
                    <TableCell
                      sx={[headerCellStyles]}
                      style={{ width: "15%" }}
                      align="right"
                    >
                      Variance
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
                      <TableCell sx={cellStyles} align="right">
                        {child.codeValue ?? ""}
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
                          {formatIndianNumber(
                            child.totBalancePrevious ??
                              child.totPreviousBalance ??
                              0
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
                          {(() => {
                            const val =
                              child.totBalanceCurrent ??
                              child.totCurrentBalance ??
                              0;
                            return val < 0
                              ? `(${formatIndianNumber(Math.abs(val))})`
                              : formatIndianNumber(val);
                          })()}
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
                          {(() => {
                            const val =
                              child.totVariance ?? child.variance ?? 0;
                            return val < 0
                              ? `(${formatIndianNumber(Math.abs(val))})`
                              : formatIndianNumber(val);
                          })()}
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

const Example = () => {
  const [worksheet, setWorksheet] = useState([]);

  const fetchCdssList = () => {
    axios
      .get(
        "http://138.128.246.29:8080/api/dynamic/screens/scr_worksheet/202502"
      )
      .then((response) => {
        setWorksheet(response.data?.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCdssList();
  }, []);

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
                Previous
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Current
              </TableCell>
              <TableCell
                sx={headerCellStyles}
                style={{ width: "15%" }}
                align="right"
              >
                Variance
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
            {worksheet.map((row) => (
              <ExpandableRow key={row.conceptId} row={row} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Example;
