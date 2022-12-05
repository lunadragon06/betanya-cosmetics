import { clearStorage } from "../../utils/storage.js";

export default function logoutButton() {
    const button = document.querySelector("#logout");
    if (button) {
        button.onclick = function () {
            const doLogout = confirm("You're about to log out. Are you sure you want to proceed this action?");
            if (doLogout) {
                clearStorage();
                location.href = "/login.html";
            }
        };
    }
}
