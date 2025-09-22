import axios from "axios";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Table from "../components/Table";

const SavLstPage = () => {
  const [data, setData] = React.useState([]);
  console.log(data);
  


  const fetchCdssList = () => {
    axios
      .get("http://34.51.85.243:8080/api/dynamic/screens/scr_savlst/202502")
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

export default SavLstPage;
