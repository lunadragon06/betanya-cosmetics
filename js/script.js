import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";

const apiUrl = baseUrl + "products";
const productsContainer = document.querySelector(".products");

createMenu();

async function getProducts(){
  const response = await fetch(apiUrl);
  const results = await response.json();
  
  document.querySelector(".loading").innerHTML = "";

  results.sort( (a,b) => a.id > b.id ? 1 : -1 ).reverse().forEach(item => {
    if(!item.featured) {
      return;
    }
    productsContainer.innerHTML += 
    `<article class="product">
    <img src="${item.image.url}" alt="${item.category}">
        <div class="product-card">
        <div class="product-info">
        <h2 style="text-transform: capitalize;">${item.brand} ${item.name} ${item.category}</h2>
            <p class="price-tag">$ ${item.price}</p>
          </div> 
            <button class="add-to-cart" data-product="${item.id}" id="to-cart">
              <i class="fas fa-cart-plus"></i>
            </button>
        </div>
      </article>
    `
  })
  // insert add cart-code here

}
getProducts();

// Header API call  
async function header() {
  const heroBanner = document.querySelector("header");
  const url = baseUrl + "header";

  const response = await fetch(url);
  const json = await response.json();

  console.log(json);
  console.log(json.img.url);

  heroBanner.innerHTML = `
  <section class="header" style="background: url('${json.img.url}') center bottom no-repeat;">
  <article class="header__content">
    <h1 class="header__heading" style="color: #E60970;">
      <span style="color: #0E6500;">
        Shop 
      </span>
        ${json.title}
    </h1>
    <h1 class="header__heading" style="color: #0E6500;"> Make Up</h1>
    <a class="header__ctabtn" href="/products.html">
      SHOP NOW
    </a>
  </article>
</section>
`
}

header();
