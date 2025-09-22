import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

const GlAccessDropDown = ({ period, setPeriod }) => {
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
    if (periods.length > 0 && !periods.some(p => p.gl_period === period)) {
      setPeriod(periods[0].gl_period);
    }
  }, [periods, period, setPeriod]);

  return (
    <div style={{backgroundColor: "#FFFFFF",padding: "20px 20px 0px 20px",borderRadius: "10px"}}>
      <FormControl sx={{ mb: "20px" }} size="small" fullWidth>
      <InputLabel id="gl-period-label">GL Period to access</InputLabel>
      <Select
        labelId="gl-period-label"
        id="gl-period-select"
        value={period}
        label="GL Period to access"
        onChange={(e) => setPeriod(e.target.value)}
      >
        {periods.map((p) => (
          <MenuItem value={p.gl_period} key={p.gl_period}>
            {p?.period_description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
  );
};

export default GlAccessDropDown;
