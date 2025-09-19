import axios from "axios";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/Table";

const FinDepPage = () => {
  const [data, setData] = React.useState([]);


  const fetchCdssList = () => {
    axios
      .get("http://34.51.72.135:8080/api/dynamic/screens/scr_findep/202502")
      .then((response) => {
        setData(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCdssList();
  }, []);

  return (
    <Table tableData={data} />
  );
};

export default FinDepPage;
