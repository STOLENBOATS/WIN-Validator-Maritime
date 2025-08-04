
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "admin" && pass === "Admin2025") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "validador.html";
    } else {
        alert("Credenciais inválidas.");
    }
}

function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}
