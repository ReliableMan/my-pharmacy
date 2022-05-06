/* eslint-disable no-restricted-syntax */
console.log('hellou', itemsArray);

const addedItems = [];

const allProd = async () => {
  const productsResult = await fetch('/cart/fetch', {});
  const allProducts = await productsResult.json();
  const allProductsArr = allProducts.products;


  const addedItemsTitles = [];

  for (const item of itemsArray) {
    if (item.includes('saleId')) {
      const findItem = allProductsArr.filter((product) => product.id == item.slice(8))[0];
      const saleItemToAdd = {
        title: `По акции: ${findItem.title}`,
        id: findItem.id,
        img: findItem.img,
        description: findItem.description,
      };
      // console.log(saleItemToAdd);
      if (!addedItemsTitles.includes(saleItemToAdd.title)) {
        saleItemToAdd.price = 0;
        saleItemToAdd.saleQuantityInCart = 1;
        addedItemsTitles.push(saleItemToAdd.title);
        addedItems.push(saleItemToAdd);

        const newCartItem = document.createElement('div');
        newCartItem.innerHTML = `<div class="card bg-light mb-3" style="max-width: 450px;">
        <div class="row g-0 truo">
        <div class="col-md-4">
          <a href="/product/${saleItemToAdd.id}"><img src=${saleItemToAdd.img} class="img-fluid rounded-start" alt=""></a>
        </div>
        <div class="col-md-8">
        <div class="card-body">
          <a href="/product/${saleItemToAdd.id}"><h5 class="card-title">${saleItemToAdd.title}</h5></a>
          <p class="card-text">${saleItemToAdd.salePrice} руб./шт.</p>
          <p class="card-text"><small class="text-success">Описание: ${saleItemToAdd.description}</small></p>
          <p id="saleQuantityInCart-${saleItemToAdd.id}" class="card-text"><small class="text-muted">Количество в корзине: ${saleItemToAdd.saleQuantityInCart} шт.</small></p>
          <p name="price0" id="salePrice-${saleItemToAdd.id}"class="card-text">${saleItemToAdd.salePrice * saleItemToAdd.saleQuantityInCart} руб.!!!</p>
        </div>
        </div>
      </div>
      </div>`;
        document.getElementById('cart-items').appendChild(newCartItem);
      }
    }

    if (!item.includes('saleId')) {
      const findNewItem = allProductsArr.filter((product) => product.id == item)[0];
      const itemToAdd = {
        title: findNewItem.title,
        id: findNewItem.id,
        img: findNewItem.img,
        description: findNewItem.description,
        price: findNewItem.price,
      };
      if (!addedItemsTitles.includes(itemToAdd.title)) {
        itemToAdd.quantityInCart = 1;
        addedItemsTitles.push(itemToAdd.title);
        addedItems.push(itemToAdd);

        const newCartItem = document.createElement('div');
        newCartItem.innerHTML = `<div class="card bg-light mb-3" style="max-width: 450px;">
        <div class="row g-0 truo">
          <div class="col-md-4">
            <a href="/product/${itemToAdd.id}"><img src=${itemToAdd.img} class="img-fluid rounded-start" alt=""></a>
          </div>
          <div class="col-md-8">
          <div class="card-body">
            <a href="/product/${itemToAdd.id}"><h5 class="card-title">${itemToAdd.title}</h5></a>
            <p class="card-text">${itemToAdd.price} руб./шт.</p>
            <p class="card-text"><small class="text-success">Описание: ${itemToAdd.description}</small></p>
            <p id="quantityInCart-${itemToAdd.id}" class="card-text"><small class="text-muted">Количество в корзине: ${itemToAdd.quantityInCart} шт.</small></p>
            <p id="price-${itemToAdd.id}"class="card-text">Стоимость: ${itemToAdd.price * itemToAdd.quantityInCart} руб.</p>
          </div>
          </div>
        </div>
        </div>`;
        document.getElementById('cart-items').appendChild(newCartItem);
        // console.log(itemToAdd);
      } else if (addedItemsTitles.includes(itemToAdd.title)) {
        const itemToAdd2 = addedItems.filter((product) => product.title === itemToAdd.title)[0];
        // console.log(itemToAdd2);
        itemToAdd2.quantityInCart += 1;
        const x = document.getElementById(`quantityInCart-${itemToAdd2.id}`);
        x.innerHTML = `<p id="quantityInCart-${itemToAdd2.id}" class="card-text"><small class="text-muted">Количество в корзине: ${itemToAdd2.quantityInCart} шт.</small></p>`;
        const y = document.getElementById(`price-${itemToAdd2.id}`);
        y.innerHTML = `<p id="price-${itemToAdd2.id}"class="card-text">Стоимость: ${itemToAdd2.price * itemToAdd2.quantityInCart} руб.</p>`;
      }
    }
  }
  // console.log(addedItemsTitles);


  let totalQuantity = 0;
  addedItems.forEach((element) => {
    element.quantityInCart ? totalQuantity += element.quantityInCart : totalQuantity;
    element.saleQuantityInCart ? totalQuantity += element.saleQuantityInCart : totalQuantity;
  });

  let totalPrice = 0;
  addedItems.forEach((element) => {
    element.price ? totalPrice += (element.price * element.quantityInCart) : totalPrice;
    element.salePrice ? totalPrice += (element.salePrice * element.saleQuantityInCart) : totalPrice;
  });

  const total = document.createElement('div');
  total.innerHTML = `<p>Общее кол-во: ${totalQuantity} шт.</p>
  <p>Сумма заказа: ${totalPrice} руб.</p>`;
  document.getElementById('cart-totals').appendChild(total);
};

allProd();

const clearCartDiv = document.getElementById('cart-btns-div');
if (itemsArray.length) {
  // если есть элементы в корзине создаем "очистить корзину"
  const clearCartBtn = document.createElement('button');
  clearCartBtn.className = 'clearCartBtn btn btn-outline-danger';
  clearCartBtn.innerHTML = 'Очистить корзину';
  clearCartDiv.appendChild(clearCartBtn);

  clearCartBtn.addEventListener('click', (e) => {
    localStorage.clear();
    window.location.reload();
  });

  // если есть элементы в корзине создаем "Оформить заказ"
  const confirmCartBtn = document.createElement('button');
  confirmCartBtn.className = 'confirmCartBtn btn btn-outline-success';
  confirmCartBtn.innerHTML = 'Оформить заказ';
  clearCartDiv.appendChild(confirmCartBtn);

  confirmCartBtn.addEventListener('click', async (e) => {
    alert('Ваш заказ успешно оформлен! Наш администратор свяжется с вами в ближайшее время');
    console.log(addedItems);
    const response = await fetch('/cart/checkout' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedItems)
    })



    // localStorage.clear();
    // window.location.reload();
  });
}
