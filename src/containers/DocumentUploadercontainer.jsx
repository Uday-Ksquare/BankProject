import {
  Button,
  Checkbox,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlAccessDropDown from "../components/GlAccessDropDown";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const tabledata = [
  { id: 1, excelFileName: "SAVLST" },
  { id: 2, excelFileName: "INVLST" },
  { id: 3, excelFileName: "GLDAYS" },
  { id: 4, excelFileName: "CDSLST" },
  { id: 5, excelFileName: "FINDEP" },
  { id: 6, excelFileName: "FINLNS" },
  { id: 7, excelFileName: "DDALST" },
];

const FileUploader = ({ setFiles, files, isEnabled }) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    event.target.value = "";
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        size="small"
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        disabled={!isEnabled}
      >
        {files.length > 0 ? "Change files" : "Upload files"}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      {files.length > 0 && (
        <Box>
          {files.map((file, idx) => (
            <Typography key={idx} variant="body2">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

const DocumentUploaderContainer = () => {
  const [period, setPeriod] = useState("");
  const [files, setFiles] = useState({});
  const [enabledRows, setEnabledRows] = useState({});

  // Toggle a single row
  const toggleRow = (id) => {
    setEnabledRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Select/Deselect all
  const toggleAll = (checked) => {
    const newState = {};
    tabledata.forEach((row) => {
      newState[row.id] = checked;
    });
    setEnabledRows(newState);
  };

  // Update file list for a row
  const updateFilesForRow = (id, fileList) => {
    setFiles((prev) => ({ ...prev, [id]: fileList }));
  };

  const uploadfiles = async () => {
    try {
      const formData = new FormData();

      // append glperiod
      formData.append("glperiod", period);

      // append files (multiple allowed)
      Object.values(files).forEach((fileList) => {
        fileList.forEach((file) => {
          formData.append("files[]", file);
        });
      });

      const response = await axios.post(
        "http://138.128.246.29:8080/api/import/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <GlAccessDropDown period={period} setPeriod={setPeriod} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  sx={{ color: "#fff" }}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </StyledTableCell>
              <StyledTableCell>Excel File</StyledTableCell>
              <StyledTableCell>File</StyledTableCell>
              <StyledTableCell>Processed Records</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  <Checkbox
                    checked={!!enabledRows[row.id]}
                    onChange={() => toggleRow(row.id)}
                  />
                </StyledTableCell>
                <StyledTableCell>{row.excelFileName}</StyledTableCell>
                <StyledTableCell>
                  <FileUploader
                    isEnabled={!!enabledRows[row.id]}
                    files={files[row.id] || []}
                    setFiles={(newFiles) => updateFilesForRow(row.id, newFiles)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">--</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button
          disabled={Object.keys(files).length === 0}
          size="small"
          color="success"
          variant="contained"
          onClick={uploadfiles}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploaderContainer;
