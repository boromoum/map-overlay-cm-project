
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://xuhqwshcc2.execute-api.ap-southeast-1.amazonaws.com/",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;