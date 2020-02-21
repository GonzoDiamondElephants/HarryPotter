'use strict';

$.ajax('/harryporter', { method: 'get', datatype: 'json' })
  .then(data => {
    console.log(data);
  });





