import axios from "axios";
import React, { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";

const CdsLstPage = () => {
  const [cdsList, setCdsList] = React.useState([]);

  const cleanData = useMemo(() => {
    return cdsList.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? "-"])
      )
    );
  }, [cdsList]);

  const fetchCdssList = () => {
    axios
      .get("http://138.128.246.29:8080/api/dynamic/screens/scr_cdslst/202502")
      .then((response) => {
        setCdsList(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCdssList();
  }, []);
  const columns = useMemo(
    () => [
      { accessorKey: "GL Period", header: "GL Period" },
      { accessorKey: "Account #", header: "Account #" },
      { accessorKey: "Type", header: "Type" },
      { accessorKey: "Account Name", header: "Account Name" },
      { accessorKey: "Account Number", header: "Account Number" },
      { accessorKey: "First Name", header: "First Name" },
      { accessorKey: "Last Name", header: "Last Name" },
      { accessorKey: "Current Balance", header: "Current Balance" },
      { accessorKey: "E.C. Equivalent", header: "E.C. Equivalent" },
      { accessorKey: "Product Definiti", header: "Product Definiti" },
      { accessorKey: "Interest Earned", header: "Interest Earned" },
      { accessorKey: "Interest Rate", header: "Interest Rate" },
      { accessorKey: "Account Status", header: "Account Status" },
      { accessorKey: "YTD Interest Pai", header: "YTD Interest Pai" },
      { accessorKey: "ECCB S1", header: "ECCB S1" },
      { accessorKey: "ECCB S2 Code", header: "ECCB S2 Code" },
      { accessorKey: "Date Opened", header: "Date Opened" },
      { accessorKey: "Foreign Curr Cod", header: "Foreign Curr Cod" },
      { accessorKey: "Int Accrued Toda", header: "Int Accrued Toda" },
      { accessorKey: "Address", header: "Address" },
      { accessorKey: "City", header: "City" },
      { accessorKey: "Country", header: "Country" },
      { accessorKey: "Zip-Code", header: "Zip-Code" },
      { accessorKey: "CIF Number", header: "CIF Number" },
      { accessorKey: "Classification C", header: "Classification C" },
      { accessorKey: "Service Charge C", header: "Service Charge C" },
      { accessorKey: "Date Last Check", header: "Date Last Check" },
      { accessorKey: "Last Check Amoun", header: "Last Check Amoun" },
      { accessorKey: "Date Last Deposi", header: "Date Last Deposi" },
      { accessorKey: "Last Deposit Amo", header: "Last Deposit Amo" },
      { accessorKey: "G/L Code", header: "G/L Code" },
      { accessorKey: "New BS1 Code", header: "New BS1 Code" },
      { accessorKey: "New BS2 Code", header: "New BS2 Code" },
      { accessorKey: "EC Equiv+Int Ear", header: "EC Equiv+Int Ear" },
      { accessorKey: "O/D Interest Ear", header: "O/D Interest Ear" },
      { accessorKey: "Branch Number", header: "Branch Number" },
      { accessorKey: "Charged Off", header: "Charged Off" },
      { accessorKey: "Related Party Ty", header: "Related Party Ty" },
      { accessorKey: "YTD Interest Acc", header: "YTD Interest Acc" },
      { accessorKey: "Int Accrued MTD", header: "Int Accrued MTD" },
      { accessorKey: "YTD O/D Int Paid", header: "YTD O/D Int Paid" },
      { accessorKey: "YTD O/D Int Earn", header: "YTD O/D Int Earn" },
      { accessorKey: "Second Name", header: "Second Name" },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: cleanData,
    initialState: {
      density: "compact",
    },
  });
  return (
    <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "10px", width: "100%", p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default CdsLstPage;
