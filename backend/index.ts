import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import dotenv from "dotenv";

import { initDB } from "./app/common/services/database.service";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import { initPassport } from "./app/common/services/passport-jwt.service";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const app: Express = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

const initApp = async (): Promise<void> => {
  try {
    await initDB();
    
    await initDB();
    app.use("/api", routes);

    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ status: "ok" });
    });

    app.use(errorHandler);

    http.createServer(app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server initialization failed:", error);
    process.exit(1);
  }
};

void initApp();
