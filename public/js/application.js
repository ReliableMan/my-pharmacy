/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-expressions */
console.log('Клиентский js');

// const addButtons = document.querySelectorAll('.addToCartBtn');
const cartCounter = document.querySelector('.cart-count');
// const counter = 0;
const products = document.querySelector('.products');
const saleProducts = document.querySelector('.sale-products');
const signout = document.getElementById('signout');
// const emptyCart = document.querySelector('.cartIs');

// используем local storage https://fix-it-problems.ru/wiki/detail.php?ELEMENT_ID=85
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []; // проверим наличие доступного localStorage
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));
let counter = data.length;

products?.addEventListener('click', async (e) => { // слушатель на весь большой div с продуктами
  // console.log('=====>', e.target.id);
  if (e.target.tagName === 'BUTTON') { // находим кнопку
    // добавляем в local storage id товаров по нажатию на кнопку:
    itemsArray.push(e.target.id);
    console.log(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    // крутим счетчик товаров в корзине по нажатию на кнопку:
    counter += 1;
    cartCounter.innerHTML = counter;

    // скрываем текст о том, что корзина пуста
    // ! не работает =(
    // console.log(emptyCart);
    // emptyCart.visibility = 'hidden';
  }
});

saleProducts?.addEventListener('click', async (e) => { // слушатель на весь большой div с акционными продуктами
  // console.log('=====>', e.target.id);
  if (e.target.tagName === 'BUTTON') { // находим кнопку
    if (itemsArray.includes(`saleId: ${e.target.id}`)) {
      alert('По акции можно купить только один продукт 🙃 ');
    } else {
      // добавляем в local storage id товаров по нажатию на кнопку:
      itemsArray.push(`saleId: ${e.target.id}`);
      console.log(itemsArray);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      // крутим счетчик товаров в корзине по нажатию на кнопку:
      counter += 1;
      cartCounter.innerHTML = counter;
    }
  }
});

cartCounter.innerHTML = data.length;

// обнуляем local storage при выходе из ЛК
signout?.addEventListener('click', (e) => {
  localStorage.clear();
});
