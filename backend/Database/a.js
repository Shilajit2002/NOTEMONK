const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('E:\\Project\\NoteMonk\\backend\\Database\\tags.json', 'utf-8');

// Parse the JSON data
const data = JSON.parse(jsonData);
console.log(data.length);

let jsonDataw = fs.readFileSync('E:\\Project\\NoteMonk\\backend\\Database\\extra.json', 'utf-8');

// Parse the JSON data
let dataw = JSON.parse(jsonDataw);
console.log(dataw.length);

// Extract distinct values
const distinctData = Array.from(new Set(data.map(item => JSON.stringify(item))))
  .map(item => JSON.parse(item));

// Convert distinct data to JSON string
const distinctJsonData = JSON.stringify(distinctData, null, 2);

// Write the distinct data to a new JSON file
fs.writeFileSync('E:\\Project\\NoteMonk\\backend\\Database\\extra.json', distinctJsonData, 'utf-8');

jsonDataw = fs.readFileSync('E:\\Project\\NoteMonk\\backend\\Database\\extra.json', 'utf-8');

// Parse the JSON data
dataw = JSON.parse(jsonDataw);
console.log(dataw.length);

console.log('Distinct data has been stored in output.json');
