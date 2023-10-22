const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = [];

async function traerProductos() {
  try {
    const respuesta = await fetch("../productos.json");
    const productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Lo sentimos",
      text: "No se pueden mostrar los productos",
    });
  } finally {
    mostrarProductos(productos);
  }
}

function mostrarProductos(productos) {
  shopContent.innerHTML = "";
  productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
          <img src= "${product.img}">
          <h3>${product.nombre}</h3>
          <p class="price">${product.precio} $</p>
          <button id="${product.id}" >
            Agregar al Carrito
          </button>  
          `;
    shopContent.appendChild(content);

    //BOTÓN DE COMPRAR//
    let comprar = document.getElementById(`${product.id}`);
    comprar.className = "comprar";
    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id == product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id == product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
      }
      Toastify({
        text: "Producto agregado al Carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    });
    carritoCounter();
  });
}

//LOS PRODUCTOS//

function eliminarCarrito() {
  carrito.length = 0;
  document.getElementById("modal-container").innerHTML = "";
}

//CARRITO//
const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
  modalContainer.append(modalHeader);
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "X";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    <P>Cantidad: ${product.cantidad}</p>
    <p>Total: ${product.cantidad * product.precio}</p>
    `;
    modalContainer.append(carritoContent);

    console.log(carrito.length);

    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
  });
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `
        <p> El total a pagar es: ${total}$ </p>
        <button id="botonComprar" class="btn btn-light">Finalizar Compra</button>
    `;
  modalContainer.appendChild(totalBuying);

  let botonComprar = document.getElementById("botonComprar");
  botonComprar.addEventListener("click", () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Su compra fue exitosa!",
      showConfirmButton: false,
      timer: 1500,
    });
    eliminarCarrito();
  });
};
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  cantidadCarrito.innerText = carrito.length;
};

traerProductos();