import dialogflow from "@google-cloud/dialogflow";
import { credKey } from "../config/cred";
import dotenv from "dotenv";
dotenv.config();
// Create a new session

const privateKey = credKey.private_key;
const credentials = {
  client_email: credKey.client_email,
  private_key: privateKey,
};
const projectId = credKey.project_id;
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

export const textQuery = async (text: String | Number) => {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    "qertwqq2i910i3212132241"
  );

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
    const responses = await sessionClient.detectIntent(request);
    if (responses) {
      console.log("Detected intent");
      const result: any = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        const resResult = {
          intent: result.intent.displayName,
          response: result.fulfillmentText,
        };
        return resResult;
      } else {
        console.log(`  No intent matched.`);
        return `  No intent matched.`;
      }
    } else {
      return "no intent found";
    }
  } catch (err) {
    console.log(err);
  }

  // filter output
  // send response
};
