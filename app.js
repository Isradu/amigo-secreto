const btnSortear = document.getElementById("btnSortear");
const inputNombre = document.getElementById("nombreAmigo");
const listaAmigos = document.getElementById("listaAmigos");
const ganador = document.getElementById("ganador");
const generoAmigo = document.getElementById("generoAmigo");

// Array para almacenar amigos
let amigos = [];

// Arrays con las URLs de las imágenes en la carpeta "assets"
const imagenesMasculinas = [
  "assets/carlitos.jpg",
  "assets/chris.jpg",
  "assets/david.jpg",
  "assets/mario.jpg"
];

const imagenesFemeninas = [
  "assets/cristina.jpg",
  "assets/gaby.jpg",
  "assets/isa.jpg",
  "assets/sofi.jpg",
  "assets/lexi.jpg"
];


// Al hacer clic en "Agregar amigo"
btnAgregar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const genero = generoAmigo.value;

  // Validamos que no esté vacío y que no supere los 10 amigos
  if (nombre && amigos.length < 8) {
    let imagen;
    if (genero === "femenino") {
      imagen = imagenesFemeninas[amigos.length % imagenesFemeninas.length];
    } else { // Si no es femenino, asumimos que es masculino
    imagen = imagenesMasculinas[amigos.length % imagenesMasculinas.length];
    } 

    const nuevoAmigo = {
      nombre,
      imagen // Cambia la URL de la imagen genérica por la de la imagen que elegiste
    };

    amigos.push(nuevoAmigo);
    mostrarAmigos();
    inputNombre.value = "";
  } else {
    alert("El nombre está vacío o ya alcanzaste el máximo de 8 amigos.");
  }
});

// Función para mostrar los amigos en la lista
function mostrarAmigos() {
  listaAmigos.innerHTML = "";
  amigos.forEach((amigo) => {
    const amigoDiv = document.createElement("div");
    amigoDiv.classList.add("amigo");
    amigoDiv.innerHTML = `
      <img src="${amigo.imagen}" alt="Imagen de ${amigo.nombre}" />
      <p>${amigo.nombre}</p>
    `;
    listaAmigos.appendChild(amigoDiv);
  });
}

// Al hacer clic en "Sortear amigo"
btnSortear.addEventListener("click", () => {
  if (amigos.length === 0) {
    alert("No hay amigos en la lista para sortear.");
    return;
  }

  // Elegimos un índice aleatorio
  const indiceGanador = Math.floor(Math.random() * amigos.length);
  const amigoGanador = amigos[indiceGanador];

  // Mostramos el ganador en pantalla
  ganador.innerHTML = `
    <h3>¡Amigo ganador!</h3>
    <img src="${amigoGanador.imagen}" alt="Ganador: ${amigoGanador.nombre}" />
    <p>${amigoGanador.nombre}</p>`;
});

document.addEventListener('DOMContentLoaded', function() {
  const btnJugar = document.getElementById('btnJugar');
  const nombreAmigo = document.getElementById('nombreAmigo');
  const btnSortear = document.getElementById('btnSortear');
  const generoAmigo = document.getElementById('generoAmigo');
  const btnAgregar = document.getElementById('btnAgregar');
  const imagenPrincipal = document.getElementById('imagenPrincipal');
  const circleImg = document.querySelector('.circle-img');
  const nombreGanador = document.getElementById('nombreGanador');

  btnJugar.addEventListener('click', function() {
    nombreAmigo.focus();
    deshabilitarBotonJugar();
  });

  generoAmigo.addEventListener('change', function() {
    if (generoAmigo.value) {
      btnAgregar.disabled = false;
    } else {
      btnAgregar.disabled = true;
    }
  });

  // Inicialmente deshabilitar el botón
  btnAgregar.disabled = true;

  btnSortear.addEventListener('click', () => {
    if (amigos.length === 0) {
      alert("No hay amigos en la lista para sortear.");
      return;
    }

    // Elegimos un índice aleatorio
    const indiceGanador = Math.floor(Math.random() * amigos.length);
    const amigoGanador = amigos[indiceGanador];


    // Cambiar la imagen en el div circle-img
    circleImg.innerHTML = `
      <img src="${amigoGanador.imagen}" alt="Ganador: ${amigoGanador.nombre}" />`;

    // Actualizar el nombre del ganador y crea un nuevo boton para reiniciar el juego. 

    nombreGanador.innerHTML = `
      <h3>¡Amigo ganador!</h3>
      <p>${amigoGanador.nombre}</p>
      <button id="btnReiniciar" class="btn">Volver a jugar</button>`;
    const btnReiniciar = document.getElementById('btnReiniciar');
    btnReiniciar.addEventListener('click', function() {
      location.reload();
    });
  });
});