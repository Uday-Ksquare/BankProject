import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const EditDrawerComponent = ({
    submitColor,
  row,
  open,
  title,
  headerColor,
  deleteText,
  cancelText,
  setOpenEdit,
}) => {
  //   const [open, setOpen] = React.useState(false);
  const [headerTextColor, setHeaderTextColor] = React.useState("");
  const handleDelete = () => {};

  const onClose = () => {
    setOpenEdit(false);
  };

  const onCancel = () => {
    onClose();
  };
  return (
    <>
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
          id="drawer-container"
          sx={{
            p: 0,
            width: { xs: "300px", md: "700px" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
              gutterBottom
              sx={{
                fontWeight: "bold",
                bgcolor: headerColor,
                color: headerTextColor,
                padding: "0.5rem 1rem 0.5rem 1rem",
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                marginRight: "0.5rem",
              }}
            >
              <CloseIcon sx={{ fontSize: "1.5rem", color: "#000000" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: { xs: "300px", md: "500px" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* <Typography
              variant="body2"
              gutterBottom
              sx={{ padding: "1rem 1rem 0 1rem" }}
            >
              Type <strong>"delete"</strong> below to confirm. This action is
              permanent and cannot be undone.
            </Typography> */}
          </Box>
          {/* <FormControl
            size="small"
            variant="outlined"
            sx={{ m: 2, width: { xs: "88%", md: "95%" } }}
          >
            <TextField
              size="small"
              label="Type 'delete' to confirm"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              fullWidth
            />
          </FormControl> */}
          {
            JSON.stringify(row, null, 2)
          }
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              mt: 0,
              display: "flex",
              justifyContent: "space-between",
              p: 2,
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
              // startIcon={<DeleteForeverIcon />}
              size="small"
              variant="contained"
              bgcolor={submitColor}
              onClick={handleDelete}
              disabled={deleteText.toLowerCase() !== "delete"}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default EditDrawerComponent;
