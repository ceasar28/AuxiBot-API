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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
const chatbot_1 = require("../config/chatbot");
const Palm_API_Key = process.env.PALM_API;
console.log(Palm_API_Key);
const prompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    const prompt = yield (0, chatbot_1.textQuery)(query);
    console.log(prompt);
    res.json({ prompt, message: "hello, this is a prompt Bot endpoint" });
});
exports.prompt = prompt;
//# sourceMappingURL=botController.js.map