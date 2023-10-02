const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos = [{
        nombre: "Agujas",
        id: 1,
        precio: 1300,
        cantidad: 1,
        img: "https://http2.mlstatic.com/D_NQ_NP_995476-MLA51519592549_092022-O.webp",
    },
    {
        nombre: "Crema",
        id: 2,
        precio: 8800,
        cantidad: 1,
        img: "https://selmadigital.com/wp-content/uploads/2021/12/Deskin_Hidratante02_1000x1000.png",
    },
    {
        nombre: "Cintas",
        id: 3,
        precio: 3600,
        cantidad: 1,
        img: "https://http2.mlstatic.com/D_NQ_NP_863860-MCO31561700413_072019-O.webp",
    },
    {
        nombre: "Espuma",
        id: 4,
        precio: 7500,
        cantidad: 1,
        img: "https://farmacityar.vtexassets.com/arquivos/ids/217230/222292_espuma-deskin-post-tatuaje-x-60-g_imagen-1.jpg?v=637720705442930000",
    },
    {
        nombre: "Punteras",
        id: 5,
        precio: 1100,
        cantidad: 1,
        img: "https://m.media-amazon.com/images/I/61vaFbtttQL.jpg",
    },

    {
        nombre: "Papel Hectográfico",
        id: 6,
        precio: 1100,
        img: "https://http2.mlstatic.com/D_NQ_NP_682823-MLA70708570418_072023-O.webp",
        cantidad: 1,
    },
]

let carrito = []

//LOS PRODUCTOS//
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;
    shopContent.append(content)

    //BOTÓN DE COMPRAR//
    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar"
    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id == product.id);
        if (repeat){
            carrito.map((prod) =>{
                if(prod.id== product.id){
                    prod.cantidad++;
                }
            });
        }else{
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        console.log(carrito);
        carritoCounter();
    });
});

//CARRITO//
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
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

        eliminar.addEventListener("click", eliminarProducto)
    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `El total a pagar es: ${total}$`;
    modalContainer.append(totalBuying);
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
    cantidadCarrito.style.display="block";
    cantidadCarrito.innerText = carrito.length;
}  