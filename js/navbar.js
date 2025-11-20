
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) return;

    let userData = localStorage.getItem("usuarioLogueado");
    let usuario = null;

    if (userData) {
        try {
            usuario = JSON.parse(userData);
        } catch {
            usuario = null;
        }
    }

    navbarContainer.innerHTML = `
        <nav class="nav">
            <h1 class="logo"><a href="../index.html">RM <span>Periféricos</span></a></h1>

            <ul class="nav-links">
                <li><a href="../index.html">Inicio</a></li>
                <li><a href="../pages/productos.html">Productos</a></li>
                ${usuario ? `<li><a href="../pages/carrito.html">Carrito</a></li>` : ""}
            </ul>

            <div class="nav-user">
                ${
                    usuario
                        ? `
                        <span class="bienvenida">Hola, ${usuario.email}</span>
                        <button id="logoutBtn" class="btn-logout">Cerrar sesión</button>
                    `
                        : `
                        <a href="../pages/login.html" class="btn-login">Iniciar sesión</a>
                        <a href="../pages/registro.html" class="btn-register">Registrarse</a>
                    `
                }
            </div>
        </nav>
    `;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "../pages/login.html";
        });
    }
});
