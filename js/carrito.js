document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");

  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
  if (carrito.length === 0) {
    lista.innerHTML = "<p class='vacio'>Tu carrito está vacío 🚫</p>";
    return;
  }

  fetch("../js/productos.json")
    .then(res => res.json())
    .then(productos => {
      let total = 0;

      lista.innerHTML = carrito.map(item => {
        const prod = Object.values(productos).flat().find(p => p.id === item.id);

        if (!prod) return "";

        total += prod.precio * item.cantidad;

        return `
          <div class="carrito-item" data-id="${prod.id}">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            
            <div class="carrito-info">
              <h3>${prod.nombre}</h3>
              <p>Precio: $${prod.precio.toLocaleString()}</p>
              <p>Cantidad: ${item.cantidad}</p>
            </div>

            <button class="btn-eliminar" data-id="${prod.id}">Eliminar</button>
          </div>
        `;
      }).join("");

      totalSpan.textContent = total.toLocaleString();
    });

  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = Number(e.target.dataset.id);

      carrito = carrito.filter(i => i.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      location.reload(); 
    }
  });
});
