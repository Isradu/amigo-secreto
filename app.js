// const btnAgregar = document.getElementById("btnAgregar");
const btnSortear = document.getElementById("btnSortear");
const inputNombre = document.getElementById("nombreAmigo");
const listaAmigos = document.getElementById("listaAmigos");
const ganador = document.getElementById("ganador");

// Array para almacenar amigos
let amigos = [];

// Al hacer clic en "Agregar amigo"
btnAgregar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();

  // Validamos que no esté vacío y que no supere los 10 amigos
  if (nombre && amigos.length < 10) {
    // Aquí puedes reemplazar la URL de la imagen por la que desees
    const nuevoAmigo = {
      nombre,
      imagen: "https://via.placeholder.com/100" // Imagen genérica
    };

    amigos.push(nuevoAmigo);
    mostrarAmigos();
    inputNombre.value = "";
  } else {
    alert("El nombre está vacío o ya alcanzaste el máximo de 10 amigos.");
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
