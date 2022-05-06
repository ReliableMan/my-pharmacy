const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const FileStore = require('session-file-store')(session);
// const multer = require('multer');
require('dotenv').config();

// * проверка подключения базы данных
const dbcheck = require('./db/dbcon');

// * импорт роутов
const indexRouter = require('./routes/index');
const mainRoutes = require('./routes/main');
const authRouter = require('./routes/auth');

const lkRouter = require('./routes/lk');
const addProductRouter = require('./routes/addProduct');
const cartRouter = require('./routes/cart');
const promoRouter = require('./routes/promo');
const oneProdRouter = require('./routes/oneProduct');
const lkEditRouter = require('./routes/lkEdit');

// * импорт контроллеров
const notFoundPage = require('./controllers/notfoundpage');

const { PORT } = process.env;

const app = express();
dbcheck();

// * подключение сессий
const sessionConfig = {
  store: new FileStore(),
  name: 'Cookie',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}aaa${file.originalname}`);
//   },
// });
// const upload = multer({ storage: fileStorageEngine });


app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
app.use(express.static(path.join(__dirname, 'public')));

// * подключение hbs

// app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use(session(sessionConfig));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

/*  сохраняем в обьект res.locals.username
имя пользователя для использования username в layout.hbs */
app.use((req, res, next) => {
  res.locals.username = req.session?.user?.name;
  res.locals.data = req.session?.user?.createdAt;
  res.locals.id = req.session?.user?.id;
  res.locals.userEmail = req.session?.user?.email;
  res.locals.isAdmin = req.session?.user?.isAdmin
  // res.locals.userEmail = req.session?.user?.email;
  // console.log(req.session?.user?.email, 'req.session?.user?.email лежит тут <=====');

  // console.log('\n\x1b[33m', 'req.session.user :', req.session.user);
  // console.log('\x1b[35m', 'res.locals.username:', res.locals.username);
  next();
});

// * роуты
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/main', mainRoutes);
app.use('/lk', lkRouter);
app.use('/addProduct', addProductRouter);
app.use('/promo', promoRouter);
app.use('/product', oneProdRouter);
app.use('/cart', cartRouter);
app.use('/lkEdit', lkEditRouter);

// * роут если нет страницы
app.use(notFoundPage);

// * Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res, next) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;
  /* Если мы находимся в режиме разработки,
  то отправим в ответе настоящую ошибку.
  В противно случае отправим пустой объект. */
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }
  /* Записываем информацию об ошибке
  и сам объект ошибки в специальные переменные,
  доступные на сервере глобально, но только в рамках одного HTTP-запроса. */
  res.locals.message = err.message;
  res.locals.error = error;
  /* Задаём в будущем ответе статус ошибки.
  Берём его из объекта ошибки, если он там есть.
  В противно случае записываем универсальный стату ошибки на сервере - 500. */
  // console.log(error, 'это ошибка из app');
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

app.get('*', (req, res) => {
  res.redirect('/main');
});

app.listen(PORT ?? 3000, () => {
  console.log('Server started at http://localhost:%s/', PORT);
});
