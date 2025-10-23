import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getScreensData } from "../services/getScreensData";
import Table from "../components/Table";
import { GlPeriodContext } from "../Contexts/GlPeriodContext";

const OverDraftPage = () => {
  const [data, setData] = useState({ screens: [], totalItems: 0 });
  const [searchParams, setSearchParams] = useSearchParams();
  const { glPeriod } = useContext(GlPeriodContext);

  // ✅ safely parse numbers (fallbacks to default if invalid)
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const reportType = searchParams.get("reportType") || "PR01";

  // ✅ fetch API when params change
  useEffect(() => {
    getScreensData("/scr_overdraft",reportType, glPeriod, pageNumber, pageSize).then(
      (res) =>
        setData({
          screens: res.screens || [],
          totalItems: res.totalItems || 0,
        })
    );
  }, [pageNumber, pageSize,glPeriod,reportType]);

  // ✅ update URL (reset page to 1 if pageSize changes)
  const handlePageChange = (newPage, newSize = pageSize) => {
    const params = {
      pageNumber: newSize !== pageSize ? 1 : newPage, // reset to 1 if size changed
      pageSize: newSize,
      period: glPeriod,
      reportType:reportType
    };
    setSearchParams(params);
  };

  return (
    <div>
      <Table
        tableData={data.screens}
        totalItems={data.totalItems}
        onPageChange={handlePageChange}
        pageNumber={pageNumber}
        pageSize={pageSize}
      />
    </div>
  );
};

export default OverDraftPage;
