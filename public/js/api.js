'use strict';

$.ajax('/harryporter', { method: 'get', datatype: 'json' })
  .then(data => {
    console.log(data);

  });

$.ajax('/weather', { method: 'get', datatype: 'json' })
  .then(data => {
    console.log(data)
    const dataKeys = Object.keys(data)
    const dataValues = Object.values(data)

    for (let i = 0; i < dataKeys.length; i++) {
      console.log(data[dataKeys[i]])
      $('#harry-pot').append("<p>brook</p>");
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


// $.ajax('/hp-house', { method: 'get', datatype: 'json' })
//   .then(data => {
//     data.forEach(house => {
//       console.log('this is forEach data', house);
//       let normilaizeData = new Harryporter(house);
//       // console.log('this is normilize data', normilaizeData);
//       let renderData = normilaizeData.render();
//       $('#house-Harry').append(renderData);
//     })


//   })

// // Sian Api house constracter . 

// function Harryporter(obj) {
//   this.name = obj.houseName;
//   this.trait = obj.trait;
//   this.discription = obj.description;
// }

// Harryporter.prototype.render = function () {
//   const source = $('#harry-pot').html();
//   let template = Handlebars.compile(source);
//   return template(this)
// }

$('#applicationForm').on('submit', function (e) {
  console.log('above preventdefault');
  e.preventDefault();
  let total = Math.round((parseInt(e.target.favClass.value) +
    parseInt(e.target.companionAnimal.value) +
    parseInt(e.target.wandType.value) +
    parseInt(e.target.gift.value) +
    parseInt(e.target.book.value)) / 5);




  console.log('book value', total);
})
