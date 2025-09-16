import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const EditDrawerComponent = ({
  submitColor = "#254678",
  row,
  open,
  title,
  headerColor = "#dce6f1",
  cancelText = "Cancel",
  setOpenEdit,
  children,
  onSubmit, // ✅ allow passing a submit callback
}) => {

  console.log(row);
  
  const onClose = () => {
    setOpenEdit(false);
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        sx: { zIndex: 2000 }, // Ensure drawer is on top
      }}
    >
      <Box
        sx={{
          width: { xs: "300px", md: "700px" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: headerColor,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#000",
              padding: "0.5rem 1rem",
            }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ mr: 1 }}>
            <CloseIcon sx={{ fontSize: "1.5rem", color: "#000000" }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>{children}</Box>

        {/* Footer */}
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            borderTop: "1px solid #ddd",
          }}
        >
          <Button
            sx={{ borderColor: "#233B5D", color: "#233B5D" }}
            variant="outlined"
            size="small"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: submitColor,
              "&:hover": { bgcolor: "#1d365c" }, // darker shade
            }}
            onClick={() => onSubmit?.(row)} // pass row back
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default EditDrawerComponent;
