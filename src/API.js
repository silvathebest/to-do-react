import axios from "axios"

export default axios.create({
  baseURL: `https://localhost:5000${ process.env.REACT_APP_API_URL }`,
  responseType: "json"
});
