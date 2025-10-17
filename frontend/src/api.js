import axios from "axios";

export default axios.create({
  baseURL: "https://chessapp-odok.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
