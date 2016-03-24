var express = require("express");
var multer = require("multer");
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var low = require('lowdb');
var lowdbStorage = require('lowdb/file-async');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack.config');
var compiler = webpack(config);

var app = express();

var fileStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, '/src/assets/images/avatars'));
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

var db = low(path.join(__dirname, '/src/assets/db.json'), { storage: lowdbStorage });
var upload = multer({ storage: fileStorage }).single('userPhoto');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true, chunks: false }
}));
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express.static(path.join(__dirname, '/src/')));

// == API ============================================================================
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

// Retreave all images from ./app/assets/images/avatars/ directory
app.get('/api/GetProfileImages', function(req, res) {
  readFiles(path.join(__dirname, '/src/assets/images/avatars/'),
    function(data) {
      for (var index = 0; index < data.length; index++) {
        data[index] = './assets/images/avatars/' + data[index];
      }
      return res.send(data);
    },
    function(error) {
      throw error;
    });
});

// Retreave all images from ./app/assets/images/pointer/ directory
app.get('/api/GetPointerImages', function(req, res) {
  readFiles(path.join(__dirname, '/src/assets/images/pointer/'),
    function(data) {
      for (var index = 0; index < data.length; index++) {
        data[index] = './assets/images/pointer/' + data[index];
      }
      return res.send(data);
    },
    function(error) {
      throw error;
    });
});

// Upload profile picture
app.post('/api/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

// Get all users defined in json lowdb file
app.get('/api/getAllUsers/:name?', function(req, res) {
  if (req.params.name != undefined) {
    res.send(db('users').find({ name: req.params.name }));
  } else {
    res.send(db('users').value());
  }
});

// Add new user in the json lowdb file
app.post('/api/addUser', function(req, res) {
  var existingUser = db('users').find({ name: req.body.name });
  if (existingUser) {
    res.send({ data: db('users').value(), message: "Корисникот веќе постои" });
  }
  else {
    db('users').push(req.body).then(post => res.send({ data: db('users').value(), message: "" }));
  }
});

// Delete user from json lowdb file
app.get('/api/deleteUser/:name', function(req, res) {
  db('users').remove({ name: req.params.name });
  res.send(db('users').value());
});

// Get UserSettings for specified username
app.get('/api/getUserSettings/:username?', function(req, res) {
  var username = req.params.username;
  if (username != undefined) {
    var user = db('users').find({ name: username })
    if (user != undefined) {
      res.send(user.userSettings);
    } else {
      res.status(404);
      res.send({ error: 'Not found' });
    }
  } else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

// Add new user in the json lowdb file
app.post('/api/saveUserSettings/:username?', function(req, res) {
  var user = db('users').find({ name: req.params.username });
  var userSettings = req.body;

  if (user) {
    db('users')
      .chain()
      .find({ name: req.params.username })
      .assign({ userSettings: userSettings })
      .value();

    res.send(userSettings);
  }
  else {
    res.status(404);
    res.send({ error: 'Not found' });
  }
});

// == API ============================================================================

// == HELPER FUNCTIONS ===============================================================
function readFiles(dirname, onSuccess, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    onSuccess(filenames);
  });
}
// == HELPER FUNCTIONS ===============================================================

app.listen(3000, function() {
  console.log("Working on port 3000");
});
