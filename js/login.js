import displayMessage from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");
const showPassword = document.querySelector(".checkpass");
console.log(showPassword);

createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Username or email and password are required.", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if (json.user) {
            // displayMessage("success", "Successfully logged in", ".message-container");

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/products.html";
        }

        if (json.error) {
            displayMessage("warning", "Incorrect username and/or password.", ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}

showPassword.addEventListener('click', function () {
    if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
});
