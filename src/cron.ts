import cron from "node-cron";

export const keepServerAlive = async (url: string) => {
  const pingServer = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await pingServer.json();

  // Schedule the cron job to run every 10 minutes
  cron.schedule("*/2 * * * *", async () => {
    console.log("pinging server...");
    await pingServer.json();
  });
};
