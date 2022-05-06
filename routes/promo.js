const router = require('express').Router()
const {Denomination,Sale, Product, ProductSale} = require('../db/models')

// *Страница с акциями
router.get('/', async (req, res) => {



    const actualDate = new Date()
    const allSale = await Sale.findAll({raw: true})
    console.log(allSale.length === 0)
    if ( allSale.length === 0) {
        res.render('promo')
    } else {
        // Получаем актуальную акцию!!!
        const actualSale = allSale.filter(el => {
            return el.start <= actualDate && el.end >= actualDate
        })

        //Получаем все акционные товары
        const allPromoProduct = await ProductSale.findAll({include: [{
                model: Product,
                attributes: ['title', 'description', 'img', 'denomination_id' ]
            }]})

        //Получаем все категорими
        const allDenomination = await Denomination.findAll({raw:true})

        //добавляем категория в товары


        // Товары участвующие в  акции
        const actualPromoProduct = allPromoProduct.filter( product => product['sale_id'] === actualSale[0].id)
        const previousPromoProduct = allPromoProduct.filter( product => product['sale_id'] === actualSale[0].id - 1)
        const nextPromoProduct = allPromoProduct.filter( product => product['sale_id'] === actualSale[0].id + 1)
        res.render('promo', {previousPromoProduct ,actualPromoProduct, nextPromoProduct})
    }
})

router.post('/', async (req, res) => {
    const {titlePromo, descriptionPromo,startDate,endDate, arr} = req.body
    const newPromo = await Sale.create({description: descriptionPromo, title: titlePromo, start: startDate, end: endDate })
    const products = await Product.findAll({order: [ ['price', 'ASC']], raw: true})
    const resultArr = [products[arr[0]],products[arr[1]],products[arr[2]], ]
    for (let i = 0; i < resultArr.length; i++) {
        const productSale =  await ProductSale.create({sale_id: newPromo.id, product_id: resultArr[i].id})
    }

})

module.exports = router

