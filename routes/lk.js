const router = require('express').Router();
const { Product } = require('../db/models');


router.get('/', async (req, res) => {
  let products;
  try {
    products = await Product.findAll({ limit: 4, order: [['id', 'DESC']] });
    return res.render('lk', { products });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось',
      error: {},
    });
  }
});

module.exports = router;
