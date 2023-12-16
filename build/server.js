"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const cron_1 = require("./cron");
const botRoute_1 = __importDefault(require("./routes/botRoute"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)());
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// router Middleware
app.use("/api/bot", botRoute_1.default);
app.use("/", (req, res) => {
    res.send("ping");
});
(0, cron_1.keepServerAlive)("https://auxi-bot.onrender.com");
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});
//# sourceMappingURL=server.js.map