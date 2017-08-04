var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar',' Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//
// console.log(months[date.getMonth()]);

var date = moment();
console.log(date.format('MMM Do, YYYY'));