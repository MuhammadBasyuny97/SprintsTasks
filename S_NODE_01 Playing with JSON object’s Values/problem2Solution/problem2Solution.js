
const { readFileSync, writeFileSync,writeFile} = require('fs');

const moment = require('moment'); 
moment().format(); 

const obj =  JSON.parse(readFileSync('../problems/problem2.json', {encoding:'utf-8'}));

 obj.accidents.map(elem => elem.date = moment(elem.date).format('YYYY-MM-DD'));

 writeFile('./output2.json',JSON.stringify(obj),(error) => {console.log(error)});

console.log(obj);