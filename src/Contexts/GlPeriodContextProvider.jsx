import React, { useState } from "react";
import { GlPeriodContext } from "./GlPeriodContext";
import { getCurrentYearMonth } from "../utils/consonants";
import { useSearchParams } from "react-router-dom";

export const GlPeriodContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = searchParams.get("period") || getCurrentYearMonth();
  const [glPeriod, setGlPeriod] = useState(period);
  // console.log(glPeriod);

  return (
    <GlPeriodContext.Provider value={{ glPeriod, setGlPeriod }}>
      {children}
    </GlPeriodContext.Provider>
  );
};
