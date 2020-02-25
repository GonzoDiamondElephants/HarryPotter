'use strict';

$( document ).ready(function() {
  $('#homePage').show();
  $('#showHouse').hide();
})

let total = 0;




// // Sian Api house constructor.

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

let sortedHouse = '';
let sortedRivalHouse = '';



$('#applicationForm').on('submit', function (e) {
  console.log('above preventdefault');
  e.preventDefault();
  total = Math.round((parseInt(e.target.favClass.value) +
    parseInt(e.target.companionAnimal.value) +
    parseInt(e.target.wandType.value) +
    parseInt(e.target.gift.value) +
    parseInt(e.target.book.value)) / 5);

  // console.log('book value', total);

  $.ajax('/hp-house', { method: 'get', datatype: 'json' })
    .then(data => {
      data.forEach(house => {
        let normalizeData = new Harrypotter(house);
        console.log(typeof(normalizeData.magicNumber));
        let houseNumber = parseInt(normalizeData.magicNumber);
        // console.log('normalize data', normalizeData.magicNumber);
        console.log('inside house render total', total);
        if (houseNumber === total){
          sortedHouse = normalizeData.houseName;
          sortedRivalHouse = normalizeData.rivalHouse;
          console.log('sorted house', sortedHouse);
          console.log('rival house', sortedRivalHouse);
          let renderData = normalizeData.render();
          $('#houseHarry').append(renderData);
        }
      })
      return {sortedHouse, sortedRivalHouse}
    })
    .then( (data) => {
      $.ajax({
        url: '/harrypotter',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json'
      })
        .then( (data) => {
          renderStuff(data);
          renderMoreStuff(data);
        })
    })
  $('#showHouse').show();
  $('#homePage').hide();

})


function renderStuff (students) {
  for ( let i = 0; i < students.friends.length; i++){
    let name = students.friends[i].name;
    let image = students.friends[i].image;

    $('#hallBackground').append(`<div class="friend">${name}</div>`);
    $('#hallBackground').append(`<img src="${image}" alt="friend" >`);
  }
}

function renderMoreStuff (students) {
  for ( let i = 0; i < students.foes.length; i++){
    let name = students.foes[i].name;
    let image = students.foes[i].image;

    $('#hallBackground').append(`<div class="foe">${name}</div>`);
    $('#hallBackground').append(`<img src="${image}" alt="foe" >`);
  }
}

$.ajax('/weather', { method: 'get', datatype: 'json' })
  .then(data => {
    console.log(data)
    const dataValues = Object.values(data)
    for (let i = 0; i < 1; i++) {
      $('.weatherContainer').append(`<div class=${dataValues[i]}>PROOF</div>` , `<p  id="currentWeather">The current weather at Hogwarts is: ${dataValues[1]}.`);
      console.log('one more',dataValues);
    }
  })




