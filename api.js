import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const ACCES_TOKEN = `${process.env.ACCES_TOKEN}`;
console.log(ACCES_TOKEN);
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCES_TOKEN}`,
  },
});

export default api;
