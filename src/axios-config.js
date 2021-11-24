import axios from "axios";

const instance = axios.create({
  // baseURL: "http://35.166.234.255:5000/api/",
  // baseURL: `http://localhost:5000/api/`,
  baseURL: "https://servicehubconnect.com/api/",
});

export default instance;
