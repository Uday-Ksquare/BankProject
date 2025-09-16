import { TextField } from "@mui/material";
import React from "react";

const FormTextField = ({ name, value, index, onChange }) => {
  const handleChange = (e) => {
    onChange(index, e.target.value);
  };

  return (
    <TextField
      fullWidth
      size="small"
      id={"outlined-basic-" + name}
      label={name}
      variant="outlined"
      value={value ?? ""}
      onChange={handleChange}
    />
  );
};

export default FormTextField;
