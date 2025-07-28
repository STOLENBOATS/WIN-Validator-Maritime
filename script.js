
function validarLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "Admin2025") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "validador.html";
        return false;
    } else {
        alert("Credenciais inválidas. Tente novamente.");
        return false;
    }
}
