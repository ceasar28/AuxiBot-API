"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    inviteEmails: {
        type: [String],
        required: true,
        lowercase: true
    },
    additionalInfo: {
        type: String,
        required: false,
        trim: true
    },
    time: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});
const Event = (0, mongoose_1.model)("event", eventSchema);
exports.default = Event;
//# sourceMappingURL=event.model.js.map