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
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";

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
// helper: detect extra indent for hierarchy
const getExtraIndent = (desc) => {
  if (!desc) return 0;

  const text = desc.trim();

  if (/^\d+\./.test(text)) {
    // Numbers like "1.", "2.", "3."
    return 0;
  }

//   if (/^\([ivxlcdm]+\)\.?/i.test(text)) {
    
    
//     return 8; // (i), (ii), (iii), etc.
//   }

  if (/^(\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\)|(?:i|ii|iii|iv|v|vi|vii|viii|ix|x))\.?/i.test(text)) {
  return 8; // Matches (i), (ii), i., ii., etc. but NOT c. or d.
}


  if (/^[a-z]\.?/.test(text)) {
    // console.log(text);
    // Lowercase letters (a., b., c.)
    return 4;
  }
if (/^(\([ivxlcdm]+\)|[ivxlcdm]+)\.?/i.test(text)) {
  return 8; // Matches (i), (ii), i., ii., etc.
}

  if (/^[A-Z]\.?/.test(text)) {
    // Uppercase letters (A., B., C.)
    return 6; // optional: slightly different than lowercase
  }

  // Fallback for text without marker
  return 2;
};

// 🔑 Recursive Row Component
const ExpandableRow = ({ row, level = 0 }) => {
  const [open, setOpen] = useState(false);

  const hasChildren = row.detalles && row.detalles.length > 0;

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            ...(level === 0 ? groupHeaderStyles : cellStyles),
            pl: 2 + level * 4 + getExtraIndent(row.descripcion), // base + hierarchy + rules
            display: "flex", // align marker + text
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

        <TableCell sx={cellStyles} align="right">
          {(
            row.totBalancePrevious ??
            row.totPreviousBalance ??
            0
          ).toLocaleString()}
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          {(
            row.totBalanceCurrent ??
            row.totCurrentBalance ??
            0
          ).toLocaleString()}
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          {(row.totVariance ?? row.variance ?? 0).toLocaleString()}
        </TableCell>
      </TableRow>

      {hasChildren && (
        <TableRow>
          <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={headerCellStyles}>Description</TableCell>
                    <TableCell sx={headerCellStyles} align="right">
                      Previous
                    </TableCell>
                    <TableCell sx={headerCellStyles} align="right">
                      Current
                    </TableCell>
                    <TableCell sx={headerCellStyles} align="right">
                      Variance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalles.map((child, i) => (
                    <ExpandableRow key={i} row={child} level={level + 1} />
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

const PrMapPage = () => {
  const [worksheet, setWorksheet] = useState([]);

  const fetchCdssList = () => {
    axios
      .get(
        "http://34.51.72.135:8080/api/dynamic/screens/scr_pr01_map/202502"
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
              <TableCell sx={headerCellStyles} align="right">
                Previous
              </TableCell>
              <TableCell sx={headerCellStyles} align="right">
                Current
              </TableCell>
              <TableCell sx={headerCellStyles} align="right">
                Variance
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

export default PrMapPage;
