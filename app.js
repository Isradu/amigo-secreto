// Autor: Isra Durán J.
document.addEventListener('DOMContentLoaded', function() { // Evento que se ejecuta cuando el contenido del DOM está cargado
    const btnJugar = document.getElementById('btnJugar'); // Variable para almacenar el botón "Jugar" en el HTML
    const nombreAmigo = document.getElementById('nombreAmigo'); // Variable para almacenar el input del nombre del amigo en el HTML
    const btnSortear = document.getElementById('btnSortear'); // Variable para almacenar el botón "Sortear amigo" en el HTML
    const generoAmigo = document.getElementById('generoAmigo'); // Variable para almacenar el select del género del amigo en el HTML
    const btnAgregar = document.getElementById('btnAgregar');  // Variable para almacenar el botón "Agregar amigo" en el HTML
    const circleImg = document.querySelector('.circle-img'); // Variable para almacenar el div de la imagen del ganador en el HTML
    const nombreGanador = document.getElementById('nombreGanador'); // Variable para almacenar el div del nombre del ganador en
  
    // Array para almacenar amigos agregados por el usuario (nombre e imagen) 
    let amigos = []; // Array vacío para almacenar los amigos agregados por el usuario
  
    // Arrays con las URLs de las imágenes en la carpeta "assets" 
    const imagenesMasculinas = [ // Array con las URLs de las imágenes masculinas
      "assets/carlitos.jpg", 
      "assets/chris.jpg",
      "assets/david.jpg",
      "assets/mario.jpg"
    ];
  
    const imagenesFemeninas = [ // Array con las URLs de las imágenes femeninas
      "assets/cristina.jpg",
      "assets/gaby.jpg",
      "assets/isa.jpg",
      "assets/sofi.jpg",
      "assets/lexi.jpg"
    ];
  
    // Función para deshabilitar el botón "Agregar amigo" 
    function deshabilitarBotonAgregar() { 
      btnAgregar.disabled = true; // Deshabilitamos el botón "Agregar amigo"
      btnAgregar.style.backgroundColor = 'gray'; // Cambiamos el color de fondo del botón a gris 
      btnAgregar.style.cursor = 'not-allowed'; // Cambiamos el cursor del botón a "no permitido" 
    }
  
    // Función para habilitar el botón "Agregar amigo"
    function habilitarBotonAgregar() {
      btnAgregar.disabled = false; // Habilitamos el botón "Agregar amigo"
      btnAgregar.style.backgroundColor = ''; // Restauramos el color de fondo del botón
      btnAgregar.style.cursor = 'pointer'; // Restauramos el cursor del botón
    }
  
    // Función para deshabilitar el botón "A jugar!"
    function deshabilitarBotonJugar() { 
      btnJugar.disabled = true; // Deshabilitamos el botón "A jugar!"
      btnJugar.style.backgroundColor = 'gray'; // Cambiamos el color de fondo del botón a gris
      btnJugar.style.cursor = 'not-allowed'; // Cambiamos el cursor del botón a "no permitido"
    }
  
    // Función para habilitar el botón "A jugar!"
    function habilitarBotonJugar() {
      btnJugar.disabled = false; // Habilitamos el botón "A jugar!"
      btnJugar.style.backgroundColor = ''; // Restauramos el color de fondo del botón
      btnJugar.style.cursor = 'pointer'; // Restauramos el cursor del botón
    }
  
    // Al hacer clic en "Agregar amigo"
    btnAgregar.addEventListener("click", () => {
      const nombre = nombreAmigo.value.trim(); // Obtenemos el valor del input y eliminamos los espacios en blanco al inicio y al final
      const genero = generoAmigo.value; // Obtenemos el valor del select del género del amigo
  
      // Validamos que no esté vacío y que no supere los 8 amigos
      if (nombre && amigos.length < 8) { // Si el nombre no está vacío y la cantidad de amigos es menor a 8
        let imagen; // Variable para almacenar la URL de la imagen del amigo
        if (genero === "femenino") { // Si el género es femenino
          imagen = imagenesFemeninas[amigos.length % imagenesFemeninas.length]; // Asignamos una imagen femenina
        } else {  // Si no es femenino, asumimos que es masculino...
          imagen = imagenesMasculinas[amigos.length % imagenesMasculinas.length]; // Asignamos una imagen masculina
        }
  
        const nuevoAmigo = { // Creamos un objeto con el nombre y la imagen del amigo
          nombre, // Propiedad nombre
          imagen // Propiedad imagen
        };
  
        amigos.push(nuevoAmigo); // Agregamos el amigo al array de amigos
        mostrarAmigos(); // Mostramos los amigos en la lista
        nombreAmigo.value = ""; // Limpiamos el input del nombre
      } else { // Si el nombre está vacío o ya alcanzaste el máximo de 8 amigos...
        alert("El nombre está vacío o ya alcanzaste el máximo de 8 amigos."); // Mostramos un mensaje de alerta
      }
    });
  
    // Función para mostrar los amigos en la lista
    function mostrarAmigos() {
      const listaAmigos = document.getElementById("listaAmigos"); // Variable para almacenar la lista de amigos en el HTML
      listaAmigos.innerHTML = ""; // Limpiamos la lista de amigos
      amigos.forEach((amigo) => { // Por cada amigo en el array de amigos...
        const amigoDiv = document.createElement("div"); // Creamos un div para el amigo
        amigoDiv.classList.add("amigo"); // Le agregamos la clase "amigo" al div
        amigoDiv.innerHTML = `
          <img src="${amigo.imagen}" alt="Imagen de ${amigo.nombre}" />
          <p>${amigo.nombre}</p>`; // Agregamos la imagen y el nombre del amigo al div
        listaAmigos.appendChild(amigoDiv); // Agregamos el div del amigo a la lista de amigos
      });
    }
  
    // Al hacer clic en "Sortear amigo"
    btnSortear.addEventListener("click", () => {
      if (amigos.length === 0) { // Si no hay amigos en la lista...
        alert("No hay amigos en la lista para sortear."); // Mostramos un mensaje de alerta
        return; // Salimos de la función
      }
  
      // Elegimos un índice aleatorio y obtenemos al amigo ganador 
      const indiceGanador = Math.floor(Math.random() * amigos.length); // Elegimos un índice aleatorio entre 0 y la cantidad de amigos
      const amigoGanador = amigos[indiceGanador]; // Obtenemos al amigo ganador
  
      // Cambiar la imagen en el div circle-img
      circleImg.innerHTML = `
        <img src="${amigoGanador.imagen}" alt="Ganador: ${amigoGanador.nombre}" />`; // Mostramos la imagen del amigo ganador
  
      // Actualizar el nombre del ganador y crear un nuevo botón para reiniciar el juego
      nombreGanador.innerHTML = `
        <h3>¡Amigo ganador!</h3>
        <p>${amigoGanador.nombre}</p>
        <button id="btnReiniciar" class="btn">Volver a jugar</button>`; // Mostramos el nombre del amigo ganador y el botón "Volver a jugar"
      const btnReiniciar = document.getElementById('btnReiniciar'); // Variable para almacenar el botón "Volver a jugar" en el HTML
      btnReiniciar.addEventListener('click', function() { // Evento click en el botón "Volver a jugar"
        location.reload(); // Recargamos la página para reiniciar el juego
      });
  
      // Habilitar el botón "A jugar!" nuevamente
      habilitarBotonJugar(); // Habilitamos el botón "A jugar!"
    });
  
    btnJugar.addEventListener('click', function() { // Evento click en el botón "Jugar"
      nombreAmigo.focus(); // Hacer foco en el input del nombre del amigo
      deshabilitarBotonJugar(); // Deshabilitar el botón "Jugar"
    });
  
    generoAmigo.addEventListener('change', function() { // Evento change en el select del género del amigo
      if (generoAmigo.value) { // Si se selecciona un género...
        habilitarBotonAgregar(); // Habilitar el botón "Agregar amigo"
      } else {  // Si no se selecciona un género...
        deshabilitarBotonAgregar(); // Deshabilitar el botón "Agregar amigo"
      }
    });
  
    // Inicialmente deshabilitar el botón
    deshabilitarBotonAgregar(); // Deshabilitamos el botón "Agregar amigo"
  });
