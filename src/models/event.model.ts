import { model, Schema } from "mongoose";

const eventSchema = new Schema({
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

const Event = model("event", eventSchema);
export default Event;