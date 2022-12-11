import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;
    const navbar = document.querySelector(".menu");
    const username = getUsername();
    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}"><i class="fas fa-user"></i></a>`;
    if (username) {
        authLink = `<a id="logout"><i class="fas fa-sign-out-alt" id="logout-icon"></i></a>`;
    }
    navbar.innerHTML = `<a href="/" class="menu__logo">Betanya Cosmetics</a>
                        <!-- Navbar toggler -->
                        <input type="checkbox" id="toggle">
                        <label class="menu__toggler" id="toggler" for="toggle">
                            <span class="menu__toggler-item"><i class="fas fa-bars"></i></span>
                        </label>
                        <ul class="menu__links">
                            <li class="menu__item">
                                <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
                            </li>
                            <li class="menu__item">
                                <a href="/products.html" class="${pathname === "/products.html" || pathname === "/products.html" ? "active" : ""}">Products</a>
                            </li>
                        </ul>
                        <div class="menu__userinterface">
                            ${authLink}
                            <a href="#" class="${pathname === "#" || pathname === "#" ? "active" : ""}"><i class="fas fa-shopping-basket"></i></a>
                        </div>`;
    logoutButton();
}
