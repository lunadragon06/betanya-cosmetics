import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();
if (!token) {
    location.href = "/login.html";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const name = document.querySelector("#name");
const brand = document.querySelector("#brand");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity");
const category = document.querySelector("#category");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");

const loading = document.querySelector(".loader");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        name.value = details.name;
        brand.value = details.brand;
        price.value = details.price;
        quantity.value = details.quantity;
        category.value = details.category;
        image.value = details.image.url;
        description.value = details.description;
        idInput.value = details.id;

        deleteButton(details.id);
        console.log(details);

    } catch (error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const brandValue = brand.value.trim();
    const priceValue = parseFloat(price.value);
    const quantityValue = parseFloat(quantity.value);
    const categoryValue = category.value.trim();
    const descriptionValue = description.value.trim();
    const idValue = idInput.value;

    if (nameValue.length === 0 || brandValue.length === 0 || isNaN(priceValue) || isNaN(quantityValue) || categoryValue.length === 0 || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }
    updateProduct(nameValue, brandValue, priceValue, quantityValue, categoryValue, descriptionValue, idValue);
}

async function updateProduct(name, brand, price, quantity, category, description, id) {
    const url = baseUrl + "products/" + id;
    const data = JSON.stringify({ name: name, brand: brand, price: price, quantity: quantity, category: category, description: description });
    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("success", "The product has been successfully updated.", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}
