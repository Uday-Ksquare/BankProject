import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getScreensData } from "../services/getScreensData";
import Table from "../components/Table";

const OverDraftPage = () => {
  const [data, setData] = useState({ screens: [], totalItems: 0 });
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ safely parse numbers (fallbacks to default if invalid)
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  // ✅ fetch API when params change
  useEffect(() => {
    getScreensData("/scr_overdraft", "202502", pageNumber, pageSize).then(
      (res) =>
        setData({
          screens: res.screens || [],
          totalItems: res.totalItems || 0,
        })
    );
  }, [pageNumber, pageSize]);

  // ✅ update URL (reset page to 1 if pageSize changes)
  const handlePageChange = (newPage, newSize = pageSize) => {
    const params = {
      pageNumber: newSize !== pageSize ? 1 : newPage, // reset to 1 if size changed
      pageSize: newSize,
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
