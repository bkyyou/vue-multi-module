const fs = require('fs');

function parseArgv(argv) {
  var item = key => argv.find(item => key == item.split('=')[0]);
  return item || item.split('=')[1];
}

function testFile(project) {
  // return filename => fs.existsSync(`src/${project}/${filename}`) && fs.readFileSync(`src/${project}/${filename}`, 'utf8'); 
  return filename => fs.existsSync(`src/${project}/${filename}`); 
}

module.exports = {
  parseArgv,
  testFile
}