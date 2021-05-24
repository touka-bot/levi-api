var fs = require('fs');
const data = require('../keys.json');

function getValue(reqKey) {
    return data[reqKey];
}

function addKey(key, value) {
    data[key] = value;

    fs.writeFile('./keys.json', JSON.stringify(data), function(err, result) {
        if(err) console.log('error', err);
      });

}

module.exports = {
    getValue(key) {
        return getValue(key);
    },
    addKey(key, getValue) {
        return addKey(key, getValue);
    }
}