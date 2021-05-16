import axios from "axios";

const Axios = axios.create({
  baseURL: "https://leoecom.herokuapp.com",
});

export default Axios;
