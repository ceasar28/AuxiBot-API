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
const nodemailer_1 = __importDefault(require("nodemailer"));
const Messages_1 = require("./Messages");
function sendEmail(to, timing, title, date, time, additionalInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.nodemailer_user,
                pass: process.env.nodemailer_password,
            },
        });
        const mailOptions = {
            from: "Tech From Root <techfromroot@gmail.com>",
            to: `${to}`,
            subject: "Auxibot Reminder",
            sender: "Auxibot",
            html: (0, Messages_1.newYearMessage)(title, timing, additionalInfo, date, time),
        };
        yield transporter.sendMail(mailOptions);
    });
}
exports.default = sendEmail;
//# sourceMappingURL=sendEmails.utils.js.map