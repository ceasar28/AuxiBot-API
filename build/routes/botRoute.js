"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const botController_1 = require("../controllers/botController");
const router = express_1.default.Router();
// Define a test endpoint
router.post("/", botController_1.prompt);
router.post("/palm", botController_1.palmPrompt);
exports.default = router;
//# sourceMappingURL=botRoute.js.map