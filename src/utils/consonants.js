export const getCurrentYearMonth=()=> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
  return `${year}${month}`;
}