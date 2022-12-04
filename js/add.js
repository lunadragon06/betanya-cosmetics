import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
    location.href = "/login.html";
}

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const brand = document.querySelector("#brand");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity");
const category = document.querySelector("#category");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

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

    if (nameValue.length === 0 || brandValue.length === 0 || isNaN(priceValue) || isNaN(quantityValue) || categoryValue.length === 0 || descriptionValue.length === 0) {
        return displayMessage("warning", "Please fill in all fields the in this form.", ".message-container");
    }

    addProduct(nameValue, brandValue, priceValue, quantityValue, categoryValue, descriptionValue);
}

async function addProduct(name, brand, price, quantity, category, description) {
    const url = baseUrl + "products";

    const data = JSON.stringify({ name: name, brand: brand, price: price, quantity: quantity, category: category, description: description });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "A new product has been successfully created!", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "Failed to add new product! Please try again later.", ".message-container");
    }
}
