// all products array
const productList = [
  {
    id: 1,
    name: "Infinix Hot 11s",
    price: 10000,
    rating: 4.4,
    brand: "Infinix",
    path: "./img/products/infinix-hot-11s.jpeg",
  },
  {
    id: 2,
    name: "Iphone 12 mini",
    price: 44000,
    rating: 4.6,
    brand: "Apple",
    path: "./img/products/iphone-12-mini.jpeg",
  },
  {
    id: 3,
    name: "Motorola g31",
    price: 13000,
    rating: 4.2,
    brand: "Motorola",
    path: "./img/products/motorola-g31.jpeg",
  },
  {
    id: 4,
    name: "Poco c3",
    price: 7499,
    rating: 4.3,
    brand: "Poco",
    path: "./img/products/poco-c3.jpeg",
  },
  {
    id: 5,
    name: "Realme 8",
    price: 14000,
    rating: 4.4,
    brand: "Realme",
    path: "./img/products/realme-8.jpeg",
  },
  {
    id: 6,
    name: "Realme 8i",
    price: 13000,
    rating: 4.5,
    brand: "Realme",
    path: "./img/products/realme-8i.jpeg",
  },
  {
    id: 7,
    name: "Realme c21y",
    price: 10999,
    rating: 4.2,
    brand: "Realme",
    path: "./img/products/realme-c21y.jpeg",
  },
  {
    id: 8,
    name: "Realme 9i",
    price: 13999,
    rating: 4.3,
    brand: "Realme",
    path: "./img/products/realme-9i.jpeg",
  },
  {
    id: 9,
    name: "Samsung f12",
    price: 12000,
    rating: 4.4,
    brand: "Samsung",
    path: "./img/products/samsung-f12.jpeg",
  },
  {
    id: 10,
    name: "Iphone se",
    price: 35000,
    rating: 4.5,
    brand: "Apple",
    path: "./img/products/iphone-se.jpeg",
  },
  {
    id: 11,
    name: "Oppo a12",
    price: 10999,
    rating: 4.7,
    brand: "Oppo",
    path: "./img/products/oppo-a12.jpeg",
  },
  {
    id: 12,
    name: "Realme narzo 50a",
    price: 12000,
    rating: 4.5,
    brand: "Oppo",
    path: "./img/products/narzo-50a.jpeg",
  },
];
// select dom elements
const Products = document.querySelector(".productlist");
const filterProduct = document.querySelector(".select__filter__option");
const cartItems = document.querySelector(".cart-items");
const subTotalDom = document.querySelector(".subtotal");
// print products to the dom
const printProducts = (productList) => {
  productList.forEach((item) => {
    let html = `<div class="item" id='${item.id}'><div class="item-modal"><span>${item.rating} / 5</span></div><img src=${item.path} alt=""><p>${item.name}</p><h4>Price:- ₹ ${item.price}</h4><button class="add_to_cart_button">Add To Cart</button></div>`;
    Products.insertAdjacentHTML("beforeend", html);
  });
};
// iife function
((productList) => {
  // print all the products when page loads from the array of products
  printProducts(productList);
  filterProduct.addEventListener("change", (e) => {
    // if the price low to high is selected then sort the array from price low to high then print the array to the dom
    if (e.target.value === "plth") {
      let priceLowToHighList = productList.sort((a, b) => a.price - b.price);
      while (Products.firstChild) Products.removeChild(Products.firstChild);
      return printProducts(priceLowToHighList);
    }
    // if the price high to low is selected then sort the array from price high to low then print the array to the dom
    if (e.target.value === "phtl") {
      let priceHighToLow = productList.sort((a, b) => b.price - a.price);
      while (Products.firstChild) Products.removeChild(Products.firstChild);
      return printProducts(priceHighToLow);
    }
    // if user select filter by popularity then sort them by their id and print to the dom
    while (Products.firstChild) Products.removeChild(Products.firstChild);
    productList.sort((a, b) => a.id - b.id);
    printProducts(productList);
  });
})(productList);

// keep track of total value of the cart and print it to subtotal button
let subtotal = 0;
const subTotal = (price, remove) => {
  if (remove) {
    subtotal -= price;
    return (subTotalDom.innerText = subtotal);
  }
  subtotal += price;
  subTotalDom.innerText = subtotal;
};

document.addEventListener("click", (e) => {
  // remove button is clicked on cart page.
  if (e.target.classList[0] == "remove") {
    let childNode = e.target.parentNode.parentNode;
    Products.childNodes.forEach((node) => {
      // update the product list add add to cart to the produt button
      if (node.id == childNode.id) {
        node.childNodes[4].innerText = "Add to cart";
        node.childNodes[4].classList.remove("added");
      }
    });
    // update the subtotal
    productList.forEach((item) => {
      return item.id == childNode.id ? subTotal(item.price, true) : null;
    });
    // remove from cart page
    cartItems.removeChild(childNode);
  }
  // if add to cart button is clicked then the item is added to the cart
  // then add added class to the add to cart button
  // then update add to cart text to go to cart
  // then update total cart value;
  if (e.target.classList[0] == "add_to_cart_button" && !e.target.classList[1]) {
    productList.forEach((item) => {
      if (item.id == e.target.parentNode.id) {
        let html = `<div class="item" id=${item.id}><img src="${item.path}" alt=""><div class="item__details"><span>Price:-₹ ${item.price}</span><span>Quantity:- <button class="inc__quantity">+</button><div class="quantity">1</div><button class="dec__quantity">-</button></span><button class="remove">remove</button>
       </div>
       </div>`;
        cartItems.insertAdjacentHTML("beforeend", html);
        e.target.classList.add("added");
        e.target.innerText = "Go to cart";
        subTotal(item.price);
      }
    });
  }
});
