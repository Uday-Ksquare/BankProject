import axios from "axios";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/Table";

const DdaLstPage = () => {
  const [ddaList, setDdaList] = React.useState([]);
  const fetchCdssList = () => {
    axios
      .get("http://34.51.72.135:8080/api/dynamic/screens/scr_ddalst/202502")
      .then((response) => {
        setDdaList(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchCdssList();
  }, []);
  // dynamically generate columns from keys of first row
 
  return (
    <Table tableData={ddaList} />
  );
};

export default DdaLstPage;
