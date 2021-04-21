var express = require("express");
var router = express.Router();
const fs = require("fs");
const { response } = require("../app");
var moment = require('moment-timezone');
const request = require("request");

/* GET all avaliable Prayer Time */
router.get("/", function (req, res, next) {
  const dataFromJsonFile = fs.readFileSync('prayerTime.json',);
  const jsonObject = JSON.parse(dataFromJsonFile).data;
 
  let todaysDay = moment().tz("Europe/Berlin").format('DD');

  const prayerName = 'fajr dhuhr asr maghrib isha'

  let result = [];
  let needObject220 = jsonObject.filter((data) => {
    if (data.date.readable.split(" ")[0] === todaysDay.toString()) {
      for (const property in data.timings) {
        const propValue = data.timings[property].replace(" (CEST)", "");
        const pryerTime = new Date(data.date.readable);

        pryerTime.setHours(propValue.split(":")[0], propValue.split(":")[1]);
        
        // const today = new Date().toLocaleString("de-DE",{timeZone: "Europe/Berlin"});
        const today = moment().tz("Europe/Berlin").toDate();
        if (today <= pryerTime && prayerName.indexOf(property.toLowerCase()) > -1) {
          result.push({
            name: property,
            time: propValue,
            date: data.date.readable,
            remaingSeconds: Math.round((pryerTime.getTime() - today.getTime())/1000),
          });
        }
      }
    }
    if (data.date.readable.split(" ")[0] === (parseInt(todaysDay) + 1).toString()) {
      for (const property in data.timings) {
        const propValue = data.timings[property].replace(" (CEST)", "");
        const pryerTime = new Date(data.date.readable);

        pryerTime.setHours(propValue.split(":")[0], propValue.split(":")[1]);
        
        // const today = new Date().toLocaleString("de-DE",{timeZone: "Europe/Berlin"});
        const today = moment().tz("Europe/Berlin").toDate();
        if (today <= pryerTime && property.toLowerCase() === 'fajr') {
          result.push({
            name: property,
            time: propValue,
            date: data.date.readable,
            remaingSeconds: Math.round((pryerTime.getTime() - today.getTime())/1000),
          });
        }
      }
    }
    
  });
  res.send(result)
});

router.get("/nextprayarevent", function (req, res, next) {
  const dataFromJsonFile = fs.readFileSync('prayerTime.json',);
  const jsonObject = JSON.parse(dataFromJsonFile).data;
 
  let todaysDay = moment().tz("Europe/Berlin").format('DD');

  const prayerName = 'fajr dhuhr asr maghrib isha'

  let result = [];
  let needObject220 = jsonObject.filter((data) => {
    if (data.date.readable.split(" ")[0] === todaysDay.toString()) {
      for (const property in data.timings) {
        const propValue = data.timings[property].replace(" (CEST)", "");
        const pryerTime = new Date(data.date.readable);

        pryerTime.setHours(propValue.split(":")[0], propValue.split(":")[1]);
        
        // const today = new Date().toLocaleString("de-DE",{timeZone: "Europe/Berlin"});
        const today = moment().tz("Europe/Berlin").toDate();
        if (today <= pryerTime && prayerName.indexOf(property.toLowerCase()) > -1) {
          result.push({
            name: property,
            time: propValue,
            date: data.date.readable,
            remaingSeconds: Math.round((pryerTime.getTime() - today.getTime())/1000),
          });
        }
      }
    }
    if (data.date.readable.split(" ")[0] === (parseInt(todaysDay) + 1).toString()) {
      for (const property in data.timings) {
        const propValue = data.timings[property].replace(" (CEST)", "");
        const pryerTime = new Date(data.date.readable);

        pryerTime.setHours(propValue.split(":")[0], propValue.split(":")[1]);
        
        // const today = new Date().toLocaleString("de-DE",{timeZone: "Europe/Berlin"});
        const today = moment().tz("Europe/Berlin").toDate();
        if (today <= pryerTime && property.toLowerCase() === 'fajr') {
          result.push({
            name: property,
            time: propValue,
            date: data.date.readable,
            remaingSeconds: Math.round((pryerTime.getTime() - today.getTime())/1000),
          });
        }
      }
    }
    
  });
  // data.date.readable.split(" ")[0] === (todaysDay + 1).toString()

  res.send(result.slice(0,2))
});
router.get("/getall", function (req, res, next) {
  const dataFromJsonFile = fs.readFileSync('prayerTime.json',);
  const jsonObject = JSON.parse(dataFromJsonFile).data;
 
  res.send(jsonObject)
});

router.get("/updatejsonfile", function (req, res, next) {
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
      res.send(data)
    }
    else{
      res.send('error')
    }
  });
  
});

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("de-DE", {timeZone: tzString}));   
}

module.exports = router;
