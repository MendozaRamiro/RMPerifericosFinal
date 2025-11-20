
document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("home-productos");
  if (!cont) return;


  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
  if (!usuario) {
  
    alert("Iniciá sesión para ver la tienda");
    window.location.href = "login.html";
    return;
  }

  fetch("../js/productos.json")
    .then(res => res.json())
    .then(data => {
      cont.innerHTML = "";
      Object.keys(data).forEach(cat => {
        const prods = data[cat].slice(0,3);
        const section = document.createElement("section");
        section.classList.add("categoria-home");
        section.innerHTML = `
          <h3>${cat.replace(/-/g,' ')}</h3>
          <div class="grid-small">
            ${prods.map(p => `
              <div class="card small">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h4>${p.nombre}</h4>
                <span class="precio">$${p.precio.toLocaleString()}</span>
              </div>`).join("")}
          </div>
        `;
        cont.appendChild(section);
      });
    })
    .catch(err => console.error("Error home:", err));
});

