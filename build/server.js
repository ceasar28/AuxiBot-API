"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const botRoute_1 = __importDefault(require("./routes/botRoute"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, database_config_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)());
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// router Middleware
app.use("/api/bot", botRoute_1.default);
app.use("/api/event", eventRoute_1.default);
app.use("/", (req, res) => {
    res.json({ message: "ping" });
});
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});
//# sourceMappingURL=server.js.map