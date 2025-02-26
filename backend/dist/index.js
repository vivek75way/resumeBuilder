"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_service_1 = require("./app/common/services/database.service");
const error_handler_middleware_1 = __importDefault(require("./app/common/middleware/error-handler.middleware"));
const routes_1 = __importDefault(require("./app/routes"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 5000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const initApp = async () => {
    try {
        await (0, database_service_1.initDB)();
        await (0, database_service_1.initDB)();
        app.use("/api", routes_1.default);
        app.get("/", (req, res) => {
            res.status(200).json({ status: "ok" });
        });
        app.use(error_handler_middleware_1.default);
        http_1.default.createServer(app).listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Server initialization failed:", error);
        process.exit(1);
    }
};
void initApp();
