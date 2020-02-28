'use strict';




$(document).ready(function () {
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

let total = 0;
let sortedHouse = '';
let sortedRivalHouse = '';

// // Sian API house constructor.

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

//Application Code

$('#applicationForm').on('submit', function (e) {
  console.log('above preventdefault');
  e.preventDefault();


  let name = e.target.wizardName.value;
  let regex = /\b(\w*john\w*)\b/gmi;
  if (regex.test(name)){
    console.log('regex works', name);
    $('#warning').append('<p class="squib">We are so sorry. Your application to Hogwarts has been denied. Squibs are welcomed to attend the muggle schools and work at Hogwarts after graduation. Please let our Muggle Liaison know if you have any questions. They can be reached with the Expecto Callo spell. We wish you the best of luck!</p>');
    $('#hallWrapper').hide();
  } else {
    total = Math.round((parseInt(e.target.favClass.value) +
    parseInt(e.target.companionAnimal.value) +
    parseInt(e.target.wandType.value) +
    parseInt(e.target.gift.value) +
    parseInt(e.target.book.value)) / 5);

    $.ajax('/hp-house', { method: 'get', datatype: 'json', data: {total} })
      .then(data => {
        data.forEach(house => {
          let normalizeData = new Harrypotter(house);
          console.log(typeof (normalizeData.magicNumber));
          let houseNumber = parseInt(normalizeData.magicNumber);
          console.log('inside house render total', total);
          if (houseNumber === total) {
            sortedHouse = normalizeData.houseName;
            sortedRivalHouse = normalizeData.rivalHouse;
            console.log('sorted house', sortedHouse);
            console.log('rival house', sortedRivalHouse);
            let renderData = normalizeData.render();
            $('#houseHarry').append(renderData);
          }
        })
        return { sortedHouse, sortedRivalHouse }
      })
      .then((data) => {
        $.ajax({
          url: '/harrypotter',
          method: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json'
        })
          .then((data) => {
            renderStuff(data);
            renderMoreStuff(data);
          })
      })}
  $('#showHouse').show();
  $('#homePage').hide();
  $('#showPatronus').hide();

})

function renderStuff(students) {
  for (let i = 0; i < students.friends.length; i++) {
    let name = students.friends[i].name;
    let image = students.friends[i].image;
    $('.friendBox').append(`<img src="${image}" alt="friend" id="friends" class="student">`);
    $('.friendBox').append(`<div id="friend">${name}</div>`);

  }
}

function renderMoreStuff(students) {
  for (let i = 0; i < students.foes.length; i++) {
    let name = students.foes[i].name;
    let image = students.foes[i].image;

    $('.foeBox').append(`<img src="${image}" alt="foe" class="student">`);
    $('.foeBox').append(`<div id="foe">${name}</div>`);
  }
}

//Weather ajax call

$.ajax('/weather', { method: 'get', datatype: 'json' })
  .then(data => {
    console.log(data)
    const dataValues = Object.values(data)
    for (let i = 0; i < 1; i++) {
      $('.weatherContainer').append(`<div class=${dataValues[i]}></div>`, `<p  id="currentWeather">The current weather at Hogwarts is: ${dataValues[1]}.`);
      console.log('one more', dataValues);
    }
  })

$('#patronusButton').on('click', function (e) {
  e.preventDefault();
  $.ajax('/patronusPage', { method: 'get', datatype: 'json' })
    .then(data => {
      let randomNum = getRandomInt(9);
      const patronusValue = Object.values(data[randomNum]);
      console.log('here is your info', patronusValue[0]);
      $('#patronusContainer').append(`<h3 class="patronusText">Your Patronus is a ${patronusValue[0]}</p>`, `<img class="patronus" src="../Img/${patronusValue[0]}.png">`);

    })
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').show();
  $('#showPresentation').hide();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('.backHome').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').show();
  $('#showPatronus').hide();
  $('#showPresentation').hide();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('.takeAgain').on('click', function () {
  location.reload();
  $('#homePage').show();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').hide();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('.alwaysVisible').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('#about').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').hide();
  $('#showBio').show();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('#strength').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').show();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('#ops').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').show();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})

$('#problem').on('click', function (e) {
  e.preventDefault();
  $('#homePage').hide();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').show();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').show();
})


$('#demo').on('click', function (e) {
  e.preventDefault();
  $('#homePage').show();
  $('#showHouse').hide();
  $('#showPatronus').hide();
  $('#showPresentation').hide();
  $('#showPos').hide();
  $('#showBio').hide();
  $('#showOps').hide();
  $('#showDemo').hide();
  $('#showProblemDomain').hide();
})


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


