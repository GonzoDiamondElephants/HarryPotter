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
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.get('/', renderIndex);
app.get('/weather', weatherHandler);
app.post('/totalRoute', houseAndDatabase);
app.get('/hp-house', houseApiHandler);

app.use(express.static('./public'));
app.set('view engine', 'ejs');

function renderIndex(req, res) {
  res.status(200).render('./index');
}

function houseAndDatabase(req, res) {
  // WRONG next 2 comments
  // let sortedHouse = req.body.sortedHouse;
  let magicNumber = req.body.total;
  // let sortedRivalHouse = req.body.sortedRivalHouse;
  let SQL = `SELECT * FROM houses WHERE house='${sortedHouse}';`;
  client.query(SQL)
    .then(result => {
      if (result.rows.length > 0 && result.rows[0] === undefined) {
        res.send(result.rows[0]);
      } else {
        houseApiHandler(magicNumber);
      }
    })
}


function getCharacters(req, res) {
  let URL = `https://hp-api.herokuapp.com/api/characters`;
  superagent.get(URL)
    .then(data => {
      let friends = [];
      let foes = [];
      let houseFriends = data.body.filter(houseobj => {
        return houseobj.house === sortedHouse;
      })
      for (let i = 0; i < 1; i++) {
        let myFriends = new Friends(houseFriends[i]);
        friends.push(myFriends);
      }
      let houseFoes = data.body.filter(houseobj => {
        return houseobj.house === sortedRivalHouse;
      })
      for (let i = 0; i < 1; i++) {
        let myFoes = new Foes(houseFoes[i]);
        foes.push(myFoes);
      }
      res.status(200).json({ friends, foes })
    })
    .catch(() => errorHandler('error 500!! something is wrong on the getCharacters function', req, res));
}

//constructor function for friends and foes

function Friends(data) {
  this.name = data.name;
  this.image = data.image;
}

function Foes(data) {
  this.name = data.name;
  this.house = data.house;
  this.image = data.image;
}

function Harrypotter(obj) {
  this.houseName = obj.houseName;
  this.trait = obj.trait;
  this.description = obj.description;
  this.icon = obj.icon;
  this.magicNumber = obj.magicNumber;
  this.rivalHouse = obj.rival;
}


Harrypotter.prototype.render = function () {
  const source = $('#harry-pot').html();
  let template = Handlebars.compile(source);
  return template(this)
}

Friends.prototype.render = function () {
  const source = $('#threeFriends').html();
  let template = Handlebars.compile(source);
  return template(this);
}

Foes.prototype.render = function () {
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

/// MADEAPIHANDLER

function houseApiHandler(potatoMagicNumber) {
  let madeURL = `https://hp-houses-api.herokuapp.com/`;
  superagent.get(madeURL)
    .then(data => {
      data.forEach(house => {
        let normalizeData = new Harrypotter(house);
        if (houseNumber === potatoMagicNumber) {
          sortedHouse = normalizeData.houseName;
          sortedRivalHouse = normalizeData.rivalHouse;
          let renderData = normalizeData.render()
            .then(data => {
              let apiToSQL = `INSERT INTO houses (magicNumber, house) VALUES (${potatoMagicNumber},'${sortedHouse}');`;
              client.query(apiToSQL);
              res.send(data.body);
            })
          $('#houseHarry').append(renderData);
        }
      })
    })
    .catch((err) => errorHandler(`error 500 !! something has wrong on made houseApiHandler, ${err.message}`, req, res));
}

//helper functions (error catching)

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
  });
