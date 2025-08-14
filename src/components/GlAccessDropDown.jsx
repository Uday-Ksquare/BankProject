import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const GlAccessDropDown = ({period, setPeriod}) => {
  return (
    <FormControl sx={{mb:"20px"}} size="small" fullWidth>
        <InputLabel id="GL Period to access">GL Period to access</InputLabel>
        <Select
          labelId="GL Period to access"
          id="demo-simple-select"
          value={period}
          label="GL Period to access"
          onChange={setPeriod}
        >
          {[ '2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4', '2024-Q1', '2024-Q2',
          '2024-Q3', '2024-Q4', '2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4'
          ].map((period) => (<MenuItem value={period}>{period}</MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

export default GlAccessDropDown