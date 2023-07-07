import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "routes";
import connectionToDatabase from "database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(router);

connectionToDatabase();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
