let mostrador = document.getElementById("mostrador");
let seleccion = document.getElementById("seleccion");
let imgSeleccionada = document.getElementById("img");
let modeloSeleccionado = document.getElementById("modelo");
let descripSeleccionada = document.getElementById("descripcion");
let precioSeleccionado = document.getElementById("precio");

const productos = [{
        nombre: "agujas",
        precio: 1300
    },
    {
        nombre: "crema",
        precio: 8800
    },
    {
        nombre: "cintas",
        precio: 3600
    },
    {
        nombre: "espuma",
        precio: 7500
    },
    {
        nombre: "punteras",
        precio: 1100
    },
    {
        nombre: "kit",
        precio: 20500
    },
    {
        nombre: "papel ectográfico",
        precio: 1100
    },
]
let carrito = []


while (seleccion != "si" && seleccion != "no") {
    alert("Hola Ingrese SI si desea comprar, o ingrese NO si no quiere")
    seleccion = prompt("¿Desea comprar? SI o NO")
}
if (seleccion == "si") {
    alert("a continuación nuestra lista de productos")
    let todoslosProductos = productos.map(
        (producto) => producto.nombre + " " + producto.precio + "$"
    );
    alert(todoslosProductos.join(" - "))
} else if (seleccion == "no") {
    alert("Gracias por venir vuelva pronto!")
}
while (seleccion != "no") {
    let producto = prompt("agrega un producto a tu carrito")
    let precio = 0

    if (producto == "agujas" || producto == "crema" || producto == "cintas" || producto == "espuma" ||
        producto == "punteras" || producto == "kit" || producto == "papel ectografico") {
        switch (producto) {
            case "agujas":
                precio = 1300;
                break;
            case "crema":
                precio = 8800;
                break;
            case "cintas":
                precio = 3600;
                break;
            case "espuma":
                precio = 7500;
                break;
            case "punteras":
                precio = 1100;
                break;
            case "kit":
                precio = 20500;
                break;
            case "papel ectografico":
                precio = 2800;
                break;
        }
        let unidades = parseInt(prompt("Cuantas unidades quiere llevar?"))
        carrito.push({
            producto,
            unidades,
            precio,
        })
        console.log(carrito)
    } else {
        alert("No tenemos ese producto! :(")
    }
    seleccion = prompt("Quiere seguir comprando?")

    while (seleccion == "no") {
        alert("Gracias por confiar en nosotros")
        carrito.forEach((carritoFinal) => {
            console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades},
                total a pagar por producto ${carritoFinal.unidades * carritoFinal.precio} `)
        })
        break;
    }
}
const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0)
console.log(`El total a pagar por su compra es de: ${total}`)


function cargar(item) {
    quitarBordes();
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid red";

    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;

    modeloSeleccionado.innerHTML = item.getElementsByTagName("p")[0].innerHTML;

    descripSeleccionada.innerHTML = "Descripción del modelo ";

    precioSeleccionado.innerHTML = item.getElementsByTagName("span")[0].innerHTML;


}

function cerrar() {
    mostrador.style.width = "100%";
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    quitarBordes();
}

function quitarBordes() {
    var items = document.getElementsByClassName("item");
    for (i = 0; i < items.length; i++) {
        items[i].style.border = "none";
    }
}