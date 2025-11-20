
document.addEventListener("DOMContentLoaded", () => {

    
    if (document.body.dataset.protegido === "true") {
        const user = localStorage.getItem("usuarioLogueado");
        if (!user) {
            window.location.href = "../pages/login.html";
        }
    }

});
