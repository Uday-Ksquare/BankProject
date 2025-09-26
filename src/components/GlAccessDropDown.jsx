import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

const GlAccessDropDown = ({ period, setPeriod, textColorIsWhite = false }) => {
  const [periods, setPeriods] = useState([]);

  const fetchGlPeriods = async () => {
    try {
      const res = await fetch("http://34.51.85.243:8080/api/import/glperiods");
      const data = await res.json();
      setPeriods(data.data || []);
    } catch (err) {
      console.error("Error fetching GL Periods", err);
    }
  };

  useEffect(() => {
    fetchGlPeriods();
  }, []);

  // Ensure valid default selection
  useEffect(() => {
    if (periods.length > 0 && !periods.some((p) => p.gl_period === period)) {
      setPeriod(periods[0].gl_period);
    }
  }, [periods, period, setPeriod]);

  return (
    <div style={{ borderRadius: "10px", marginTop: "20px" }}>
      <FormControl sx={{ mb: "20px" }} size="small" fullWidth>
        <InputLabel
          id="gl-period-label"
          sx={{
            color: textColorIsWhite ? "white" : "black",
            "&.Mui-focused": {
              color: textColorIsWhite ? "white" : "black",
            },
          }}
        >
          GL Period to access
        </InputLabel>
        <Select
          labelId="gl-period-label"
          id="gl-period-select"
          value={period}
          label="GL Period to access"
          onChange={(e) => setPeriod(e.target.value)}
          sx={{
            color: textColorIsWhite ? "white" : "black", // text color
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: textColorIsWhite ? "white" : "black",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: textColorIsWhite ? "white" : "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: textColorIsWhite ? "white" : "black",
            },
            "& .MuiSvgIcon-root": {
              color: textColorIsWhite ? "white" : "black", // dropdown arrow
            },
          }}
        >
          {periods.map((p) => (
            <MenuItem
              value={p.gl_period}
              key={p.gl_period}
            >
              {p?.period_description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GlAccessDropDown;
