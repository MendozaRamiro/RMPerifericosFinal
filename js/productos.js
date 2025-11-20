
document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  
  const usuario = localStorage.getItem("usuarioLogueado");
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a los productos.");
    window.location.href = "login.html";
    return;
  }

  const botonesFiltro = document.querySelectorAll(".filtro");
  let productos = {};
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
  async function cargarJSON() {
    const rutas = [
      "../js/productos.json",
      "./js/productos.json",
      "/js/productos.json"
    ];
    for (let r of rutas) {
      try {
        const res = await fetch(r);
        if (!res.ok) throw new Error();
        return await res.json();
      } catch (e) {}
    }
    throw new Error("No se pudo cargar productos.json");
  }

  cargarJSON()
    .then(data => {
      productos = data;
      mostrarProductos(Object.values(productos).flat());
    })
    .catch(() => {
      contenedor.innerHTML = "<p>Error cargando productos.</p>";
    });


 
  function crearCardHTML(prod) {
    const item = carrito.find(p => p.id === prod.id);
    const cantidad = item ? item.cantidad : 1;

    return `
      <div class="card" data-id="${prod.id}">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="descripcion">${prod.descripcion ?? ""}</p>
        <span class="precio">$${prod.precio.toLocaleString()}</span>

        <div class="cantidad-controls">
          <button class="btn-menos" data-id="${prod.id}">-</button>
          <span class="num" id="num-${prod.id}">${cantidad}</span>
          <button class="btn-mas" data-id="${prod.id}">+</button>
        </div>

        <button class="btn-carrito" data-id="${prod.id}">
          Agregar al carrito
        </button>
      </div>
    `;
  }

  
  function mostrarProductos(lista) {
    contenedor.innerHTML = lista.map(p => crearCardHTML(p)).join("");
  }

  
  contenedor.addEventListener("click", (e) => {
    const t = e.target;

   
   if (t.classList.contains("btn-carrito")) {
  const id = +t.dataset.id;

  
  const num = document.getElementById(`num-${id}`);
  const cantidadSeleccionada = Number(num.textContent);

  
  let item = carrito.find(p => p.id === id);

  if (item) {
      
      item.cantidad += cantidadSeleccionada;
  } else {
     
      carrito.push({ id, cantidad: cantidadSeleccionada });
  }

  guardarCarrito();

  t.textContent = "Agregado ✓";
  setTimeout(() => t.textContent = "Agregar al carrito", 1000);
  return;
}

    
    if (t.classList.contains("btn-mas")) {
      const id = +t.dataset.id;
      const num = document.getElementById(`num-${id}`);
      num.textContent = Number(num.textContent) + 1;
      actualizarCarrito(id, 1);
      return;
    }

    
    if (t.classList.contains("btn-menos")) {
      const id = +t.dataset.id;
      const num = document.getElementById(`num-${id}`);
      const v = Number(num.textContent);
      if (v > 1) {
        num.textContent = v - 1;
        actualizarCarrito(id, -1);
      }
      return;
    }
  });

  
  botonesFiltro.forEach(b => {
    b.addEventListener("click", () => {
      const cat = b.dataset.cat;

      if (cat === "todos") {
        mostrarProductos(Object.values(productos).flat());
      } else {
        mostrarProductos(productos[cat] || []);
      }
    });
  });

  
  function actualizarCarrito(id, cambio) {
    let item = carrito.find(p => p.id === id);
    if (item) item.cantidad += cambio;
    guardarCarrito();
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

});
