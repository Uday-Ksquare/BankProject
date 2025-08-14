import { Button, styled, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

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

const FileUploader = ({ setFiles, files,isEnable }) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles); // overwrite for this row
    event.target.value = ""; // allow reselecting same file
  };

  return (
    <Box display="flex" alignItems="center" flexDirection={"column"} gap={2}>
      <Button
        size="small"
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        disabled={!isEnable}
      >
        {files.length > 0 ? "Change files" : "Upload files"}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>

      {/* Display file names */}
      {files.length > 0 && (
        <Box p={0}>
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

export default FileUploader;
