var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var images = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const defaultSft = "https://media.gettyimages.com/photos/disabled-woman-training-taekwondo-with-her-coach-picture-id1350650910?s=2048x2048"
let currentSft = defaultSft

/* GET home page. */
const router = express.Router();
router.get('/', (req, res) => { res.redirect('/home') })

router.get('/home', (req, res) => {
  res.render('index', { sfturl: currentSft });
});

/* Sft */
router.post('/sft', (req, res, next) => {
  console.log(req.body)
  if (req.body) {
    currentSft = req.body.sfturl

  }
});


app.use('/', router);
module.exports = app;
