document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    if (!formLogin) return;

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Completá ambos campos.");
            return;
        }

        
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      
        let usuario = usuarios.find(u => u.email === email && u.password === password);

        
        if (!usuario) {
            usuario = { email, password };
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

       
        window.location.href = "../pages/productos.html";
    });
});
