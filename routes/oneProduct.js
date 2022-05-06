const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const product = await Product.findOne({ where: { id }, raw: true });
  // console.log(product);
  res.render('oneProduct', { product });
});

module.exports = router;
