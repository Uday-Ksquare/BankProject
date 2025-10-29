import axios from "axios";

export const getTablesToImport = () =>
  axios
    .get(`http://34.51.85.243:8080/api/import/tablestoimport`)
    .then((res) => res.data);
