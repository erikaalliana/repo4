const shopContent= document.getElementById("shopContent")
const verCarrito= document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

const productos = [{
        nombre: "Agujas",
        id:1,
        precio: 1300,
        img: "https://http2.mlstatic.com/D_NQ_NP_995476-MLA51519592549_092022-O.webp"

    },
    {
        id:2,
        nombre: "Crema",
        precio: 8800,
        img: "https://selmadigital.com/wp-content/uploads/2021/12/Deskin_Hidratante02_1000x1000.png"  
    },
    {
        id:3,
        nombre: "Cintas",
        precio: 3600,
        img: "https://http2.mlstatic.com/D_NQ_NP_863860-MCO31561700413_072019-O.webp"

    },
    {
        id:4,
        nombre: "Espuma",
        precio: 7500,
        img: "https://farmacityar.vtexassets.com/arquivos/ids/217230/222292_espuma-deskin-post-tatuaje-x-60-g_imagen-1.jpg?v=637720705442930000"
    },
    {
        id:5,
        nombre: "Punteras",
        precio: 1100,
        img: "https://m.media-amazon.com/images/I/61vaFbtttQL.jpg"
    },
  
    {
        id:6,
        nombre: "Papel Hectográfico",
        precio: 1100,
        img: "https://http2.mlstatic.com/D_NQ_NP_682823-MLA70708570418_072023-O.webp"
    },
]

let carrito = []

//los productos
productos.forEach((product)=>{
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;
shopContent.append(content)

//boton de comprar 
let Comprar = document.createElement("button")
Comprar.innerText = "Comprar";
Comprar.className = "Comprar"
content.append(Comprar);

Comprar.addEventListener("click", ()=>{
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
    });
    console.log(carrito);
});
}); 

//Carrito
verCarrito.addEventListener("click", () =>{
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.className= "modal-header-button";

    modalHeader.append(modalbutton);

    carrito.forEach((product)=> {
        let carritoContent= document.createElement("div")
    carritoContent.className="modal-content"
    carritoContent.innerHTML= `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    `;
    modalContainer.append(carritoContent)
    });
    const total=carrito.reduce((acc, el)=> acc + el.precio, 0);

const totalBuying= document.createElement("div");
totalBuying.className= "total-content";
totalBuying.innerHTML=`El total a pagar es: ${total}$`;
modalContainer.append(totalBuying);
});



