'use strict';



let total = 0;

$.ajax('/weather', { method: 'get', datatype: 'json' })
  .then(data => {

    const dataKeys = Object.keys(data)
    const dataValues = Object.values(data)

    for (let i = 0; i < dataKeys.length; i++) {
      console.log(data[dataKeys[i]])
      $('#harry-pot').append('<p>book</p>');
      console.log($('#harry-pot'))

    }
    // console.log(data);
    // let renderData = data.render();
    // // return template;
  })
// weather.prototype.render = function () {
//   let source = $('#harry-pot').html();
//   let template = Handlebars.compile(source);
//   return template(this);

// }

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
        })
    })


})


function renderStuff (students) {
  console.log(students);
  // students.friends.forEach (friend => {

  // })
}
