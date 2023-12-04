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
exports.textQuery = void 0;
const dialogflow_1 = __importDefault(require("@google-cloud/dialogflow"));
const cred_1 = require("../config/cred");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new session
const privateKey = cred_1.credKey.private_key;
const credentials = {
    client_email: cred_1.credKey.client_email,
    private_key: privateKey,
};
const projectId = cred_1.credKey.project_id;
const sessionClient = new dialogflow_1.default.SessionsClient({ projectId, credentials });
const textQuery = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, "qertwqq2i910i3212132241");
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: `${text}`,
                // The language used by the client (en-US)
                languageCode: "en-US",
            },
        },
    };
    try {
        // Send request and log result
        const responses = yield sessionClient.detectIntent(request);
        if (responses) {
            console.log("Detected intent");
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
                const resResult = {
                    intent: result.intent.displayName,
                    response: result.fulfillmentText,
                };
                return resResult;
            }
            else {
                console.log(`  No intent matched.`);
                return `  No intent matched.`;
            }
        }
        else {
            return "no intent found";
        }
    }
    catch (err) {
        console.log(err);
    }
    // filter output
    // send response
});
exports.textQuery = textQuery;
//# sourceMappingURL=chatbot.js.map