const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

function failAuth(res, err) {
  return res.status(401).json({ err });
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log('ловим айдишник-->', id);
  res.render('lkEdit');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, email, password,
  } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    const hashedPassword = await bcrypt.hash(password, 10);

    user.set({
      login: name, email, password: hashedPassword,
    });

    await user.save();

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('Cookie');
      console.log('это будет наш юзер===>', user);
      // res.sendStatus(200); // * Жизненный цикл заканчивается у ручки
      // res.status(200); // * то же самое
      res.json({
        ok: true,
      });
    });
  } catch (err) {
    // console.error('Err message: ', err.message);
    // console.error('Err code: ', err.code);
    return failAuth(res, err.message);
  }
});

module.exports = router;
