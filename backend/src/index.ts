import express from "express";
require("dotenv").config();
const cors = require('cors');
import { router } from "./routes";


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
