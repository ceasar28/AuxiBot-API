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
const node_cron_1 = __importDefault(require("node-cron"));
const keepServerAlive = (url) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(url);
    yield fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json(); // Parse the JSON from the response
    })
        .then((data) => {
        // Handle the data retrieved from the API
        console.log("Data from API:", data);
        // Perform further actions with the data
    })
        .catch((error) => {
        // Handle errors that occurred during the fetch request
        console.error("There was a problem with the fetch operation:", error);
    });
});
// Schedule the cron job to run every 10 minutes
node_cron_1.default.schedule("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("pinging server...");
    keepServerAlive("https://auxi-bot.onrender.com");
}));
//# sourceMappingURL=cron.js.map