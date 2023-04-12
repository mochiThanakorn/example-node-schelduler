const cron = require("node-cron");
const fs = require("fs");

console.log("start");

const logFilePath = "./logs";

const createLogFileName = () => {
  try {
    const currentDate = new Date();
    const fileName = `${currentDate.getFullYear()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}.log`;
    return `${logFilePath}/${fileName}`;
  } catch (err) {
    console.error(err);
  }
};

const logToFile = (message) => {
  try {
    const logFile = createLogFileName();
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logFile, logMessage, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error(err);
  }
};

cron.schedule("* * * * *", () => {
  logToFile("run scheduler a every minute");
});

//  Schedule a task to run every 5 minute
// cron.schedule("*/5 * * * *", () => {
//   logToFile("run scheduler b every 5 minute");
// });

//  Schedule a task to run every day at 6:30am
// cron.schedule("30 6 * * *", () => {
//   console.log("Running a task every day at 6:30am");
// });

//  Schedule a task to run every Monday at 10:00pm
// cron.schedule("0 22 * * 1", () => {
//   console.log("Running a task every Monday at 10:00pm");
// });
