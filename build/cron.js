"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keepServerAlive = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const keepServerAlive = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const pingServer = yield fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    const data = yield pingServer.json();
    // Schedule the cron job to run every 10 minutes
    node_cron_1.default.schedule("*/2 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("pinging server...");
        yield pingServer.json();
    }));
});
exports.keepServerAlive = keepServerAlive;
//# sourceMappingURL=cron.js.map