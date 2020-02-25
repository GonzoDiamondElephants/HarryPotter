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
app.use(express.json());



app.get('/', renderIndex);
app.get('/weather', weatherHandler);
app.post('/harrypotter', apiHandler);
app.get('/hp-house', houseApiHandler);

// app.get('/results', resultsHandler);

// function renderWeather(req, res) {
//   // res.render(`./weather`);
// }

app.use(express.static('./public'));
app.set('view engine', 'ejs');

// const aliveAgain = require('./app');



function renderIndex(req, res) {
  res.status(200).render('./index');
}




function apiHandler(req, res) {
  // console.log('i want this body!', (req.body));
  let sortedHouse = req.body.sortedHouse;
  let sortedRivalHouse = req.body.sortedRivalHouse;
  let URL = `https://hp-api.herokuapp.com/api/characters`;
  superagent.get(URL)
    .then(data => {
      let friends = [];
      let foes = [];
      let houseFriends = data.body.filter(houseobj => {
        return houseobj.house === sortedHouse;
      })
      for (let i = 0; i < 3; i++){
        let myFriends = new Friends(houseFriends[i]);
        friends.push(myFriends);
      }
      let houseFoes = data.body.filter(houseobj => {
        return houseobj.house === sortedRivalHouse;
      })
      for (let i = 0; i < 2; i++){
        let myFoes = new Foes(houseFoes[i]);
        foes.push(myFoes);
      }
      // console.log('friends', houseFriends);
      // console.log('foes', houseFoes);


      // need a constructor function and then to send index.ejs
      // res.send(data.body);

      res.status(200).json({friends, foes})
    })

    .catch(() => errorHandler('error 500!! something has wrong on  apiHandler function', req, res));
}

//constructor function for friends and foes

function Friends (data) {
  this.name = data.name;
  this.image = data.image;
}

function Foes (data) {
  this.name = data.name;
  this.house = data.house;
  this.image = data.image;
}


Friends.prototype.render = function (){
  const source = $('#threeFriends').html();
  let template = Handlebars.compile(source);
  return template(this);
}

Foes.prototype.render = function (){
  const source = $('#harry-pot').html();
  let template = Handlebars.compile(source);
  return template(this);
}




// WEATHER CODE

//weather function
function Weather(data) {
  this.icon = data.icon;
  this.summary = data.summary;
}

function weatherHandler(req, res) {
  let weatherURL = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/54.939196,-3.929788`;
  superagent.get(weatherURL)
    .then(data => {
      const weatherForecast = new Weather(data.body.currently);
      res.send(weatherForecast);
    })
    .catch((err) => errorHandler(`error 500!! something has wrong on  weatherHandler function, ${err.message}`, req, res));
}


/// MADEAPIHANDLER . 

function houseApiHandler(req, res) {
  let madeURL = `https://hp-houses-api.herokuapp.com/`;
  // console.log(madeURL)
  superagent.get(madeURL)
    .then(data => {
      res.send(data.body);
    })
    .catch((err) => errorHandler(`error 500 !! something has wrong on madeApiHandler, ${err.message}`, req, res));
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

// function resultsHandler(req, res) {
//   $('#applicationForm').on('submit', function (e) {
//     e.defaultValue();
//     console.log(e);
//     e.target.gift.value
//     console.log('gift value', e.target.gift.value);
//   })
//   res.render()

// }




app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

