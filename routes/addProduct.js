const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Product } = require('../db/models');

// middlewar для малтера
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}aaa${file.originalname}`);
//   },
// });
// const upload = multer({ storage: fileStorageEngine });
const imagesPath = path.join(__dirname, '..', 'public', 'images');
const upload = multer({ dest: imagesPath });

router.get('/', (req, res) => {
  res.render('addProduct');
});

router.post('/', upload.single('productImg'), async (req, res) => {
  // console.log(req.file);
  // res.send('Вы успешно загрузили файл');
  const {
    productName, productPrice, productDescription, productImg, productQuantity, productCategory,
  } = req.body;
  const newPath = req.file.path.slice(77);
  // console.log(productImg, 'productImg==============>');
  const newProduct = await Product.create({
    title: productName,
    price: productPrice,
    description: productDescription,
    img: newPath,
    quanity: productQuantity,
    denomination_id: productCategory,
  });
  res.redirect('/');
});

// router.post('/', upload.single('productImg'), (req, res, next) => {
//   console.log(req.file);
//   res.send('Вы успешно загрузили файл');
// });

module.exports = router;
