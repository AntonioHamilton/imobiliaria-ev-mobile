import axios from "axios";

export const api = axios.create({
  baseURL: "https://imobiliaria-ev.vercel.app/api",
});
