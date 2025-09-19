import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import GlAccessDropDown from "../components/GlAccessDropDown";
import { getCurrentYearMonth } from "../utils/consonants";
import { useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";

const CdsLstPage = () => {
  const [cdsList, setCdsList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [period, setPeriod] = useState(getCurrentYearMonth());

  const fetchCdssList = (glPeriod) => {
    axios
      .get(
        `http://34.51.72.135:8080/api/dynamic/screens/scr_cdslst/${glPeriod}`
      )
      .then((response) => {
        setCdsList(response.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching CDS list:", error);
      });
  };

  useEffect(() => {
    if (period) {
      setSearchParams({ glPeriod: period });
      fetchCdssList(period);
    }
  }, [period]);

  return (
    <Stack spacing={2}>
      <GlAccessDropDown period={period} setPeriod={setPeriod} />
      <Table tableData={cdsList} />
    </Stack>
  );
};

export default CdsLstPage;
