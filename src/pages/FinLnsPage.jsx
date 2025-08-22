import axios from "axios";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/Table";

const FinLnsPage = () => {
  const [data, setData] = React.useState([]);


  const fetchCdssList = () => {
    axios
      .get("http://138.128.246.29:8080/api/dynamic/screens/scr_finlns/202502")
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

export default FinLnsPage;
