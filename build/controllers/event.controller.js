"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const event_model_1 = __importDefault(require("../models/event.model"));
const yup = __importStar(require("yup"));
const sendEmails_utils_1 = __importDefault(require("../utils/sendEmails.utils"));
const node_cron_1 = __importDefault(require("node-cron"));
class EventController {
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventSchema = yup.object().shape({
                title: yup.string().required('Title is required').trim(),
                email: yup.string().email('Invalid email format').required('Email is required').lowercase().trim(),
                inviteEmails: yup.array().of(yup.string().email('Invalid email format')).required('Invite emails are required'),
                additionalInfo: yup.string().trim(),
                date: yup.string().required('Date is required').matches(/^\d{4} - \d{2} - \d{2}$/),
                time: yup.string().required('Time is required').matches(/^\d{2}:\d{2}$/)
            });
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid request body',
                });
            }
            try {
                yield eventSchema.validate(req.body, {
                    abortEarly: false
                });
            }
            catch (error) {
                const errorMessage = [];
                if (error instanceof yup.ValidationError) {
                    error.inner.forEach((detail) => {
                        errorMessage.push(detail.message);
                    });
                }
                else {
                    errorMessage.push("Validation error");
                }
                return res.status(403).send({
                    message: errorMessage,
                    success: false,
                });
            }
            const dateParts = req.body.date.split(' - ');
            const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
            const dateTime = new Date(`${formattedDate}T${req.body.time}:00.000Z`);
            const utcTime = new Date(dateTime.toISOString());
            const cronExpressionOneDayBefore = `${utcTime.getUTCMinutes()} ${utcTime.getUTCHours()} ${utcTime.getUTCDate() - 1} ${utcTime.getUTCMonth() + 1} *`;
            const cronExpressionOneHourBefore = `${utcTime.getUTCMinutes()} ${utcTime.getUTCHours() - 1} ${utcTime.getUTCDate()} ${utcTime.getUTCMonth() + 1} *`;
            console.log(cronExpressionOneDayBefore);
            console.log(cronExpressionOneHourBefore);
            const { email, title, date, time } = req.body;
            req.body.time = dateTime;
            const createdEvent = yield event_model_1.default.create(req.body);
            node_cron_1.default.schedule(cronExpressionOneDayBefore, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, sendEmails_utils_1.default)(email, "a day", title, date, time);
                    console.log('Email for one day before sent successfully');
                }
                catch (error) {
                    console.error('Error sending email:', error);
                }
            }));
            node_cron_1.default.schedule(cronExpressionOneHourBefore, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, sendEmails_utils_1.default)(email, "one hour", title, date, time);
                    console.log('Email for one hour before sent successfully');
                }
                catch (error) {
                    console.error('Error sending email:', error);
                }
            }));
            const event = yield event_model_1.default.findOne({ _id: createdEvent.id }, "-__v");
            return res.status(201)
                .send({
                success: true,
                message: "Event created successfully",
                event: event
            });
        });
    }
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_model_1.default.find({ email: req.query.email }, "-__v").sort({ time: 1 });
                return res.status(200).send({
                    success: true,
                    message: "Events fetched successfully",
                    events: events,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = EventController;
//# sourceMappingURL=event.controller.js.map