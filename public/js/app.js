'use strict';

// // app.get('api.js', alive);

// // app.post('server.js', aliveAgain);

// function aliveAgain (req, res) {
//   res.send('hey Im alive');
// }


$('#applicationForm').on('submit', function (e) {
  console.log('the form we submit');
  e.preventDefault();
  e.target.book.value;
  console.log('gift value', e.target.gift.value);
})



// module.exports = aliveAgain;
