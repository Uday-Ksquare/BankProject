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

// Detect indentation based on description format
const getIndentation = (description) => {
  if (/^[ivxlcdm]+\./i.test(description.trim())) return "3rem"; // roman numeral
  if (/^[A-Z]\./.test(description.trim())) return "1.5rem"; // capital letter
  if (/^\d+\./.test(description.trim())) return "2rem"; // number
  return "1rem"; // default
};

const data = {
  sections: [
    {
      sectionTitle: "RESIDENTS",
      rows: [
        { description: "A. Government", ecDollar: 124, foreignCurrency: null },
        { description: "i. Central", ecDollar: 124, foreignCurrency: null },
        { description: "ii. Local", ecDollar: null, foreignCurrency: null },
      ],
      total: { ecDollar: 2468, foreignCurrency: null },
    },
    {
      sectionTitle: "NON-RESIDENTS",
      rows: [
        {
          description: "A. Other ECCU Territories",
          ecDollar: 85,
          foreignCurrency: null,
        },
      ],
      total: { ecDollar: 85, foreignCurrency: 8470 },
    },
    {
      sectionTitle: "Miguel",
      rows: [
        { description: "A. Miguel Government", ecDollar: 500, foreignCurrency: null },
        { description: "i. Central", ecDollar: 124, foreignCurrency: null },
        { description: "ii. Local", ecDollar: null, foreignCurrency: null },
      ],
      total: { ecDollar: 2468, foreignCurrency: null },
    },
  ],
  grandTotal: { ecDollar: 2553, foreignCurrency: 8470 },
  footer: {
    bank: "Antigua Commercial Bank",
    date: "2025-02",
    country: "Antigua and Barbuda",
    pr01: 11023,
    difference: null,
    bpodSuppliers: 3,
    accruals: 11020,
  },
};

const SettlementAccountsPayable = () => {
  return (
    <Box p={4} sx={{ bgcolor: "#FFFFFF", borderRadius: "10px" }}>
      <Typography
        variant="p"
        sx={{ textTransform: "none" }}
        align="left"
        fontWeight="normal"
        gutterBottom
      >
        Supplement L1
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "18px",
          py: "10px",
        }}
        gutterBottom
        align="start"
        fontWeight="normal"
      >
        Settlement Accounts Payable Classified by Sector of Owner and Type
      </Typography>
      <Typography
        align="start"
        sx={{ mb: 3, color: "#727272", fontSize: "14px" }}
      >
        All figures in thousands of Eastern Caribbean dollars
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
            {data.sections.map((section, index) => (
              <React.Fragment key={index}>
                {/* Section Title */}
                <TableRow>
                  <TableCell colSpan={3} sx={sectionStyles}>
                    {section.sectionTitle}
                  </TableCell>
                </TableRow>

                {/* Section Rows with auto-indent */}
                {section.rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      sx={{
                        ...cellStyles,
                        pl: getIndentation(row.description),
                      }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell sx={cellStyles}>{row.ecDollar ?? ""}</TableCell>
                    <TableCell sx={cellStyles}>
                      {row.foreignCurrency ?? ""}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Section Total */}
                <TableRow>
                  <TableCell sx={groupHeaderStyles}>
                    TOTAL {section.sectionTitle.toUpperCase()}
                  </TableCell>
                  <TableCell sx={groupHeaderStyles}>
                    {section.total.ecDollar}
                  </TableCell>
                  <TableCell sx={groupHeaderStyles}>
                    {section.total.foreignCurrency ?? ""}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}

            {/* Grand Total */}
            <TableRow>
              <TableCell sx={groupHeaderStyles}>GRAND TOTAL</TableCell>
              <TableCell sx={groupHeaderStyles}>
                {data.grandTotal.ecDollar}
              </TableCell>
              <TableCell sx={groupHeaderStyles}>
                {data.grandTotal.foreignCurrency}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography fontWeight="bold" sx={{ mb: 3 }}>
        The notes explaining the definitions of the sectors used in these
        supplements are given in the ‘General Instructions to All Schedules’.
      </Typography>

      {/* Footer Table */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={headerCellStyles}>Bank</TableCell>
              <TableCell sx={cellStyles}>{data.footer.bank}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Date</TableCell>
              <TableCell sx={cellStyles}>{data.footer.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Country</TableCell>
              <TableCell sx={cellStyles}>{data.footer.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>PR01</TableCell>
              <TableCell sx={cellStyles}>
                {data.footer.pr01.toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Difference</TableCell>
              <TableCell sx={cellStyles}>
                {data.footer.difference ?? "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>BPOD Suppliers</TableCell>
              <TableCell sx={cellStyles}>{data.footer.bpodSuppliers}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={headerCellStyles}>Accruals</TableCell>
              <TableCell sx={cellStyles}>
                {data.footer.accruals.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SettlementAccountsPayable;
