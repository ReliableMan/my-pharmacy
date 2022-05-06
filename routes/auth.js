const express = require('express');
const {
  isValid,
  createUserAndSession,
  checkUserAndCreateSession,
  destroySession,
} = require('../controllers/authControl');

// const { User, Post } = require('../db/models');

const router = express.Router();
// страница регистрации
router.get('/new', (req, res) => {
  res.render('registration');
});
// регистрация пользователя
router.post('/new', isValid, createUserAndSession, async (req, res) => {
  // const { name } = req.body;
  console.log('===> регистрация', req.body);
});
// страница аутентификации пользователя
router.get('/signin', (req, res) => {
  res.render('login');
});
// аутентификация пользователя
router.post('/signin', checkUserAndCreateSession, (req, res) => {
  console.log('===> логин', req.body);
});
router.get('/signout', destroySession, (req, res) => {
  res.locals.username = null;
  res.render('login');
});
module.exports = router;
