import { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  Collapse,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import EditDrawerComponent from "../pages/EditDrawerComponent";
import { formatFinancial } from "../utils/consonants";
import FormTextField from "./FormTextField";
import { PatchDetails } from "../services/PatchDetails";

const updatedData = (data, editingRow, row) =>
  data.map((item) => ({
    ...item,
    detailId: editingRow.detailId,
    glPeriod: "202502",
    conceptId: row.conceptId,
    columnValue: parseFloat(item.columnValue),
  }));

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
  if (
    /^(\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\)|(?:i|ii|iii|iv|v|vi|vii|viii|ix|x))\.?/i.test(
      text
    )
  )
    return 8;
  if (/^[a-z]\.?/.test(text)) return 4;
  if (/^[A-Z]\.?/.test(text)) return 6;
  return 2;
};

const ExpandableRowTable = ({
  row,
  level = 0,
  emptyAllColumns,
  width = "15%",
}) => {
  const [open, setOpen] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editFields, setEditFields] = useState([]);
  const hasChildren = row.detalles && row.detalles.length > 0;

  useEffect(() => {
    setEditFields(editingRow?.allColumns || []);
  }, [editingRow]);

  const handleFieldChange = (index, newValue) => {
    setEditFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, columnValue: newValue } : field
      )
    );
  };

  const renderCells = (columns) =>
    columns?.map((col, idx) => (
      <TableCell width={width} key={idx} sx={cellStyles} align="right">
        <div
          style={{
            display: "inline-block",
            padding: "2px 4px",
            fontSize: "12px",
            borderRadius: "4px",
          }}
        >
          {formatFinancial(col?.columnValue)}
        </div>
      </TableCell>
    ));

  const childColumns = hasChildren ? row.detalles[0]?.allColumns || [] : [];

  return (
    <>
      {/* Parent Row */}
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

        {/* Render parent columns dynamically */}
        {renderCells(
          row.allColumns.length === 0 ? emptyAllColumns : row.allColumns
        )}

        {/* Actions */}
        <TableCell sx={cellStyles} align="right">
          <Button
            size="small"
            onClick={() => {
              setOpenEdit(true);
              setEditingRow(row);
            }}
            disabled={row.allColumns.length === 0}
            variant="contained"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>

      {/* Edit Drawer */}
      <EditDrawerComponent
        submitColor="#254678"
        row={editingRow}
        open={openEdit}
        title="Edit Concept"
        headerColor="#dce6f1"
        deleteText="Delete"
        cancelText="Cancel"
        setOpenEdit={setOpenEdit}
        onSubmit={() => PatchDetails(updatedData(editFields, editingRow, row))}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          {editFields.map((field, index) => (
            <FormTextField
              key={index}
              value={field.columnValue}
              name={field.columnName}
              index={index}
              onChange={handleFieldChange}
            />
          ))}
          <pre>
            {JSON.stringify(updatedData(editFields, editingRow, row), null, 2)}
          </pre>
        </Box>
      </EditDrawerComponent>

      {/* Children Rows */}
      {hasChildren && (
        <TableRow>
          <TableCell colSpan={6} sx={{ padding: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={"50%"} sx={headerCellStyles}>
                      Description
                    </TableCell>
                    {childColumns.map((col, idx) => (
                      <TableCell key={idx} sx={headerCellStyles} align="right">
                        {col.columnName}
                      </TableCell>
                    ))}
                    <TableCell
                      width={"10%"}
                      sx={headerCellStyles}
                      align="right"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalles.map((child, i) => (
                    <TableRow key={i}>
                      <TableCell
                        sx={{
                          ...cellStyles,
                          pl:
                            2 +
                            (level + 1) * 4 +
                            getExtraIndent(child.detailLabel),
                        }}
                      >
                        {child.descripcion || child.detailLabel}
                      </TableCell>
                      {renderCells(child.allColumns)}
                      <TableCell sx={cellStyles} align="right">
                        <Button
                          size="small"
                          onClick={() => {
                            setOpenEdit(true);
                            setEditingRow(child);
                          }}
                          disabled={child.allColumns.length === 0}
                          variant="contained"
                        >
                          Edit
                        </Button>
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

export default ExpandableRowTable;
