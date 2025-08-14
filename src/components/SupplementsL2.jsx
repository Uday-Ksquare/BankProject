import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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

const sectionStyles = {
  ...cellStyles,
  fontWeight: "bold",
  backgroundColor: "#b8cce4",
};

const groupHeaderStyles = {
  ...cellStyles,
  fontWeight: "bold",
  backgroundColor: "#f2f2f2",
};

const SupplementsL2 = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        SUPPLEMENT I2
      </Typography>
      <Typography variant="h6" align="center" fontWeight="bold">
        SETTLEMENT ACCOUNTS PAYABLE CLASSIFIED BY SECTOR OF OWNER AND TYPE
      </Typography>
      <Typography align="center" sx={{ mb: 3 }}>
        (All figures in thousands of Eastern Caribbean dollars)
      </Typography>

      {/* Main Table */}
      <Paper sx={{ overflowX: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyles}>Sector</TableCell>
              <TableCell sx={headerCellStyles}>EC DOLLAR</TableCell>
              <TableCell sx={headerCellStyles}>FOREIGN CURRENCY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Section 1: Residents */}
            <TableRow>
              <TableCell colSpan={3} sx={sectionStyles}>
                1. RESIDENTS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cellStyles}>A. Government</TableCell>
              <TableCell sx={cellStyles}>124</TableCell>
              <TableCell sx={cellStyles}>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cellStyles}>&emsp;i. Central</TableCell>
              <TableCell sx={cellStyles}>124</TableCell>
              <TableCell sx={cellStyles}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cellStyles}>&emsp;ii. Local</TableCell>
              <TableCell sx={cellStyles}></TableCell>
              <TableCell sx={cellStyles}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cellStyles}>B. National Insurance (Social Security Scheme)</TableCell>
              <TableCell sx={cellStyles}></TableCell>
              <TableCell sx={cellStyles}></TableCell>
            </TableRow>
            {/* Add all remaining rows like above... */}
            <TableRow>
              <TableCell sx={groupHeaderStyles}>TOTAL RESIDENTS</TableCell>
              <TableCell sx={groupHeaderStyles}>2,468</TableCell>
              <TableCell sx={groupHeaderStyles}>-</TableCell>
            </TableRow>

            {/* Section 2: Non-Residents */}
            <TableRow>
              <TableCell colSpan={3} sx={sectionStyles}>
                2. NON RESIDENTS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cellStyles}>A. Other ECCU Territories</TableCell>
              <TableCell sx={cellStyles}>85</TableCell>
              <TableCell sx={cellStyles}>-</TableCell>
            </TableRow>
            {/* Add remaining Non-Resident rows similarly... */}
            <TableRow>
              <TableCell sx={groupHeaderStyles}>TOTAL NON-RESIDENTS</TableCell>
              <TableCell sx={groupHeaderStyles}>85</TableCell>
              <TableCell sx={groupHeaderStyles}>8,470</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={groupHeaderStyles}>GRAND TOTAL</TableCell>
              <TableCell sx={groupHeaderStyles}>2,553</TableCell>
              <TableCell sx={groupHeaderStyles}>8,470</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography fontWeight="bold" sx={{ mb: 3 }}>
        The notes explaining the definitions of the sectors used in these supplements are given in the ‘General Instructions to All Schedules’.
      </Typography>

      {/* Footer Table */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={headerCellStyles}>Bank</TableCell>
              <TableCell sx={cellStyles}>Antigua Commercial Bank</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Date</TableCell>
              <TableCell sx={cellStyles}>Feb-2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Country</TableCell>
              <TableCell sx={cellStyles}>Antigua and Barbuda</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>PR01</TableCell>
              <TableCell sx={cellStyles}>11,023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Difference</TableCell>
              <TableCell sx={cellStyles}>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>BPOD Suppliers</TableCell>
              <TableCell sx={cellStyles}>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Accruals</TableCell>
              <TableCell sx={cellStyles}>11,020</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SupplementsL2;
