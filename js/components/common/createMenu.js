import { getUsername } from "../../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const { pathname } = document.location;
    const container = document.querySelector(".menu-container");
    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">
                        <i class="fas fa-user"></i>
                    </a>`;

    if (username) {
        authLink = `
                    <a id="logout">
                        <i class="fas fa-sign-out-alt" id="logout-icon"></i>
                    </a>
                    `;
    }

    container.innerHTML = `        <!-- navbar Logo -->
    <a href="/" class="logo">Betanya Cosmetics</a>

    <!-- Navbar Toggler -->
    <input type="checkbox" id="box-1">
    <label id="toggler" for="box-1">
        <span><i class="fas fa-bars"></i></span>
    </label>

                                <ul>
                                <li>
                                <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">
                                    Home
                                </a>
                                </li>
                                <li>
                                <a href="/products.html" class="${pathname === "/products.html" || pathname === "/products.html" ? "active" : ""}">
                                    Products  
                                </a>
                                </li>
                                </ul>

                                <div id="navbar-form">
                                ${authLink}
                                <a href="#" class="${pathname === "#" || pathname === "#" ? "active" : ""}">
                                    <i class="fas fa-shopping-basket"></i>
                                </a>
                            </div>
                        `;
    logoutButton();
}
