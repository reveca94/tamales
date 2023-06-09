const stockProductos = [
    {
      id: 1,
      nombre: "tamales de pollo",
      cantidad: 1,
      desc: "maiz,pollo,huevo,aceitunas",
      precio: 3.5,
      img: "https://perusumaqcom.files.wordpress.com/2018/03/tamales-verdes.jpg?w=806",
    },
    {
      id: 2,
      nombre: "tamal de carne",
      cantidad: 1,
      desc: "maiz, carne de cerdo,huevo, aceitunas",
      precio: 4,
      img: "https://th.bing.com/th/id/R.90fc4c07fb6a9d6fc3b93a5e5c265b97?rik=t55n0TLhhN3KAA&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      nombre: "tamales veganos",
      cantidad: 1,
      desc: "maiz,aceitunas,aji amarillo en tiras",
      precio: 3,
      img: "https://th.bing.com/th/id/R.51b2f55827f8342a1d1651171824b7b1?rik=bxtSL8G6C3hDkQ&pid=ImgRaw&r=0&sres=1&sresct=1",
    },
    {
      id: 4,
      nombre: "alfajores",
      cantidad: 1,
      desc: "harina y maizena con dulce de leche",
      precio: 1 ,
      img: "https://th.bing.com/th/id/R.17776a151463e589a45294ffe35110a4?rik=nHt2w79RklGjHQ&riu=http%3a%2f%2fperudelights.com%2fwp-content%2fuploads%2f2012%2f09%2fAlfajores-9-1024x768.jpg&ehk=CqmXtDeHzSkJk1G79pUX96aBvwZOcybwVJRFIReuUbc%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 5,
      nombre: "alfajor sin gluten",
      cantidad: 1,
      desc: "harina de coco y maizena",
      precio: 1,
      img: "https://bing.com/th?id=OSK.9e7d36b2c42c4d9a142f00448717b7b3",
    },
    {
      id: 6,
      nombre: "rocoto 1 bolsa",
      cantidad: 1,
      desc: "el mas picante",
      precio: 3.5,
      img: "https://th.bing.com/th/id/R.4abe67c778b1cf9d589612a44bbbc500?rik=D9equVF%2fJqMIqQ&pid=ImgRaw&r=0",
    },
    {
      id: 7,
      nombre: "aji de polleria",
      cantidad: 25,
      desc: "No compres esto por tu bien",
      precio: 1,
      img: "https://th.bing.com/th/id/OIP.dfmdsHggw1tF3yKQLpUcmQHaE5?pid=ImgDet&rs=1",
    },
    {
      id: 8,
      nombre: "chicha morada",
      cantidad: 1,
      desc: "Dispara como nunca",
      precio: 1 ,
      img: "https://th.bing.com/th/id/R.63430b81ef456c29ee73409c900b8296?rik=APfBpyl5Fjnh5Q&pid=ImgRaw&r=0",
    }
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

//document.getElementById('procesar-pago')
 //.addEventListener('submit', function(event) {
  //event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }