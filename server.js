'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const PORT = process.env.PORT;
const app = express();
require('ejs');
app.use(cors());

app.get('/weather', weatherHandler);

// function renderWeather(req, res) {
//   // res.render(`./weather`);
// }

app.use(express.static('./public'));
app.set('view engine', 'ejs');

// const aliveAgain = require('./app');


app.get('/', renderIndex);
app.get('/harryporter', apiHandler);

function renderIndex(req, res) {

  res.status(200).render('./index');
}

function apiHandler(req, res) {
  let URL = `https://www.potterapi.com/v1/characters?key=$2a$10$LndczsEp4R/F8gnZKCS0x.oeqF6WSS7sP9xnYax4nYpB.hu8xwKse`;
  superagent.get(URL)
    .then(data => {

      // console.log(data.body)
      res.send(data.body);

    })

    .catch(() => errorHandler('error 500!! something has wrong on  apiHandler function', req, res));
}

// WEATHER CODE

//weather function

function Weather (data) {
  this.icon = data.icon;
  this.summary = data.summary;
}

function weatherHandler(req, res) {
  let weatherURL = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/54.939196,-3.929788`;
  superagent.get(weatherURL)
    .then(data => {
      const weatherForecast = new Weather(data.body.currently);
      console.log(weatherForecast);
      res.send(weatherForecast);
    })
    .catch ((err) => errorHandler(`error 500!! something has wrong on  weatherHandler function, ${err.message}`, req, res));
}


// const client = new pg.Client(process.env.DATABASE_URL);

// client.on('error', err => console.error(err));
// app.get('/', (request, response) => {
//   response.send(`It's alllllive!`);
// });

//helper functions (error catching)


function errorHandler(error, request, response) {
  response.status(500).send(error);
}

//server "listener"

// app.get('app.js', aliveAgain);


app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

