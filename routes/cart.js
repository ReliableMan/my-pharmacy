const router = require('express').Router();
const { Product, Order, OrderProducts } = require('../db/models');


router.get('/', async (req, res) => {
  res.render('cart');
});

router.get('/fetch', async (req, res) => {
  const products = await Product.findAll({ raw: true });
  // console.log('all prod ====>', products.length);
  // res.send(products);
  console.log('fetch hello');
  res.json({ products });
});

router.post('/checkout', async (req, res) => {
  const order = await Order.create({number: req.session.user.id * req.body.length, user_id: req.session.user.id })
  const bodyArr = req.body

  for ( let i = 0; i < bodyArr.length; i++) {
    let orderProduct = await OrderProducts.create({order_id: order.id, product_id: bodyArr[i].id, quantity: bodyArr[i].price})
  }

  // Нужно отправить сообщение и что то сделать еще
  res.sendStatus(200)
})

module.exports = router;
