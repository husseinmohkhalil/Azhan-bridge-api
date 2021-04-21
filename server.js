const app = require("./app");
const http = require("http");
const request = require("request");
const fs = require("fs");
http.createServer(app).listen(3000, () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var year = dateObj.getUTCFullYear();
  const url =
    "http://api.aladhan.com/v1/calendar?latitude=47.9568123&longitude=7.7496747&method=12&month=" +
    month +
    "&year=" +
    year;
  request(url, function (error, response, body) {
    console.log(`getting json from Api ...`);
    if (!error && response.statusCode == 200) {
      const toJson = JSON.parse(body);
      let data = JSON.stringify(toJson, null, 2);
      fs.writeFileSync("prayerTime.json", data);
      console.log(`json saved successfuly`);
      console.log(`Application is running on port 3000`);
    } else {
      console.log(`json not saved!!!`);
      console.log(`Application is running on port 3000`);
    }
  });
});
