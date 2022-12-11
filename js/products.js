import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";

const token = getToken();
if (!token) {
    location.href = "/login.html";
}
const productsUrl = baseUrl + "products";

createMenu();

(async function () {
    const productDisplay = document.querySelector(".display__products");
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        productDisplay.innerHTML = "";

        json.sort( (a,b) => a.id > b.id ? 1 : -1 ).reverse().forEach(function (product) {
            productDisplay.innerHTML += 
            `<article class="productitem">
                <div class="productitem__content">
                <img class="productitem__view" src="${product.image.url}" alt="${product.category}">
                    <span class="productitem__details">
                    <h2>${product.name}</h2>
                <div>
                <p><b>Brand name: </b>${product.brand}</p>
                <p style="text-transform: capitalize;">
                    <b style="text-transform: none;">Product type: </b>${product.category}
                </p>
                </div>
                </span>
                </div>
                    <div class="productitem__setting">
                    <p class="productitem__setting-tag" style="text-align: right;"><b>$</b> ${product.price}</p>
                    <a class="productitem__setting-link" href="edit.html?id=${product.id}"><i class="fas fa-edit"></i></a>
                </div>
            </article>
        `;
    });
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".display__products");
    }
})();
