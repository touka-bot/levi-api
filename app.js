var express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors');
var app = express();

var whitelist = ['http://client.4c3711.xyz', '4c3711.xyz', 'localhost']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});