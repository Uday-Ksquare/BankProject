export const getCurrentYearMonth=()=> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
  return `${year}${month}`;
}

export function formatIndianNumber(value) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const formatFinancial = (val) => {
  if (val == null) return "0.00";
  return val < 0
    ? `(${formatIndianNumber(Math.abs(val))})`
    : formatIndianNumber(val);
};
