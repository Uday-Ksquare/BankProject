// components/ExpandableRow.js
import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableHead,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import FormTextField from "./FormTextField";
import { formatFinancial } from "../utils/consonants";
import EditDrawerComponent from "../pages/EditDrawerComponent";

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

const getExtraIndent = (desc) => {
  if (!desc) return 0;
  const text = desc.trim();
  if (/^\d+\./.test(text)) return 0;
  if (/^(\((?:i|ii|iii|...)\)|(?:i|ii|iii|...))\.?/i.test(text)) return 8;
  if (/^[a-z]\.?/.test(text)) return 4;
  if (/^[A-Z]\.?/.test(text)) return 6;
  return 2;
};

const ExpandableRowTable = ({ row, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editFields, setEditFields] = useState(editingRow?.allColumns || []);

  useEffect(() => {
    setEditFields(editingRow?.allColumns || []);
  }, [editingRow]);

  const hasChildren = row.detalles && row.detalles.length > 0;

  const handleFieldChange = (index, newValue) => {
    setEditFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, columnValue: newValue } : field
      )
    );
  };

  return (
    <>
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

        <TableCell sx={cellStyles} align="right">
          {formatFinancial(row?.allColumns[0]?.columnValue)}
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          {formatFinancial(row?.allColumns[1]?.columnValue)}
        </TableCell>
        <TableCell sx={cellStyles} align="right">
          <Button
            onClick={() => {
              setOpenEdit(true);
              setEditingRow(row);
            }}
            size="small"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>

      {/* Edit Drawer */}
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
        </Box>
      </EditDrawerComponent>

      {hasChildren && (
        <TableRow>
          <TableCell colSpan={5} sx={{ padding: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small">
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
                  {row.detalles.map((child, i) => (
                    <ExpandableRowTable key={i} row={child} level={level + 1} />
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

export default ExpandableRowTable;
