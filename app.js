const express = require("express");
const request = require("request");
const cron = require("node-cron");
const fs = require("fs");

const routes = require("./routes/index");
const prayerEvent = require("./routes/prayerEvent");

const app = express();

// Schedule tasks to be run on the server.
cron.schedule("1 0 * * *", function () {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var year = dateObj.getUTCFullYear();
  const url =
    "http://api.aladhan.com/v1/calendar?latitude=47.9568123&longitude=7.7496747&method=12&month=" +
    month +
    "&year=" +
    year;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const toJson = JSON.parse(body);
      let data = JSON.stringify(toJson, null, 2);
      fs.writeFileSync("prayerTime.json", data);
    }
  });
});
app.use("/", routes);
app.use("/prayerevent", prayerEvent);
module.exports = app;
