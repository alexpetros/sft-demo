const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const PORT = 3000

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
  res.render('index', { sfturl: currentSft })
});

/* Sft */
router.get('/sft', (req, res, next) => {
  res.redirect(currentSft)
});

router.post('/sft', (req, res, next) => {
  console.log(req.body)
  if (req.body) {
    currentSft = req.body.sfturl
  }
});

app.use('/', router);
module.exports = app;
