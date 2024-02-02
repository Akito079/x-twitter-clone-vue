import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttprequest";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  alert("No token");
}
