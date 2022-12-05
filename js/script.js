import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";

const api = baseUrl + "products";
const displayProducts = document.querySelector(".products");

createMenu();

// API call ~ Homepage
async function getProducts(){
  const response = await fetch(api);
  const results = await response.json();
  
  document.querySelector(".loader").innerHTML = "";

  results.sort( (a,b) => a.id > b.id ? 1 : -1 ).reverse().forEach(item => {
    displayProducts.innerHTML += 
    `
    <article class="product">
    <img class="product__img" src="${item.image.url}" alt="${item.category}">
        <div class="product__card">
          <h2 class="product__item">
            ${item.brand} ${item.name} ${item.category}
          </h2>
          <p class="product__pricetag">
            $ ${item.price}
          </p>
        </div> 
        <button class="product__cartbtn" data-product="${item.id}" id="cartbtn">
          <i class="fas fa-cart-plus"></i>
        </button>
      </article>
    `;
  });
}

getProducts();


// Header API call  
async function header() {
  const heroBanner = document.querySelector("header");
  const url = baseUrl + "header";

  const response = await fetch(url);
  const json = await response.json();

  heroBanner.innerHTML = `
  <section class="header" style="background: url('${json.img.url}') center bottom no-repeat;">
    <article class="header__content">
      <h1 class="header__heading">
      <span style="color: #0E6500;">
        Shop 
      </span>
        ${json.title}
      </h1>
      <h1 class="header__heading" style="color: #0E6500;"> 
        Make Up
      </h1>
      <a class="header__ctabtn" href="/products.html">
        SHOP NOW
      </a>
    </article>
  </section>
  `;
}

header();
