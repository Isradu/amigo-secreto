// Autor: Isra Durán J.
document.addEventListener('DOMContentLoaded', function() { // Evento que se ejecuta cuando el contenido del DOM está cargado
    const btnJugar = document.getElementById('btnJugar'); // Variable para almacenar el botón "Jugar" en el HTML
    const nombreAmigo = document.getElementById('nombreAmigo'); // Variable para almacenar el input del nombre del amigo en el HTML
    const btnSortear = document.getElementById('btnSortear'); // Variable para almacenar el botón "Sortear amigo" en el HTML
    const generoAmigo = document.getElementById('generoAmigo'); // Variable para almacenar el select del género del amigo en el HTML
    const btnAgregar = document.getElementById('btnAgregar');  // Variable para almacenar el botón "Agregar amigo" en el HTML
    const circleImg = document.querySelector('.circle-img'); // Variable para almacenar el div de la imagen del ganador en el HTML
    const nombreGanador = document.getElementById('nombreGanador'); // Variable para almacenar el div del nombre del ganador en
    const audioSorteo = document.getElementById('audioSorteo'); // Variable para el audio de celebración
  
    // Array para almacenar todos los amigos agregados por el usuario (nombre e imagen) 
    let amigos = []; 
  
    // Arrays con las URLs de las imágenes en la carpeta "assets" 
    const imagenesMasculinas = [
      "assets/carlitos.jpg", 
      "assets/chris.jpg",
      "assets/david.jpg",
      "assets/mario.jpg"
    ];
  
    const imagenesFemeninas = [ // Array con las URLs de las imágenes femeninas que tenemos en la carpeta "assets"
      "assets/cristina.jpg",
      "assets/gaby.jpg",
      "assets/isa.jpg",
      "assets/sofi.jpg",
      "assets/lexi.jpg"
    ];
    
    // Arrays para rastrear las imágenes disponibles de cada género
    let imagenesMasculinasDisponibles = [...imagenesMasculinas];
    let imagenesFemeninasDisponibles = [...imagenesFemeninas];
    
    // Función para obtener una imagen aleatoria no utilizada del género especificado
    function obtenerImagenAleatoria(genero) {
      let imagenesDisponibles = genero === "femenino" ? imagenesFemeninasDisponibles : imagenesMasculinasDisponibles;
      
      // Si no quedan imágenes disponibles, reiniciar el array con todas las imágenes originales
      if (imagenesDisponibles.length === 0) {
        imagenesDisponibles = genero === "femenino" ? [...imagenesFemeninas] : [...imagenesMasculinas];
        if (genero === "femenino") {
          imagenesFemeninasDisponibles = imagenesDisponibles;
        } else {
          imagenesMasculinasDisponibles = imagenesDisponibles;
        }
      }
      
      // Seleccionar una imagen aleatoria de las disponibles
      const indiceAleatorio = Math.floor(Math.random() * imagenesDisponibles.length);
      const imagenSeleccionada = imagenesDisponibles[indiceAleatorio];
      
      // Eliminar la imagen seleccionada del array de disponibles
      if (genero === "femenino") {
        imagenesFemeninasDisponibles.splice(indiceAleatorio, 1);
      } else {
        imagenesMasculinasDisponibles.splice(indiceAleatorio, 1);
      }
      
      return imagenSeleccionada;
    }
  
    // Función para deshabilitar el botón "Agregar amigo" cuando no se selecciona un género o ya se alcanzó el máximo de amigos que podemos agregar
    function deshabilitarBotonAgregar() { 
      btnAgregar.disabled = true; // Deshabilitamos el botón "Agregar amigo"
      btnAgregar.style.backgroundColor = 'gray'; // Cambiamos el color del botón a gris cuando está deshabilitado
      btnAgregar.style.cursor = 'not-allowed'; // Cambiamos el cursor del botón a "no permitido" mientras esté deshabilitado
    }
  
    // Función para habilitar el botón "Agregar amigo" cuando ya se seleccionó un género y no se alcanzó el máximo de amigos
    function habilitarBotonAgregar() {
      btnAgregar.disabled = false; // Habilitamos el botón "Agregar amigo"
      btnAgregar.style.backgroundColor = ''; // Restauramos el color de fondo del botón
      btnAgregar.style.cursor = 'pointer'; // Restauramos el cursor del botón y se pone como manita al pasar sobre él
    }
  
    // Función para deshabilitar el botón "A jugar!" cuando ya se hizo clic en él
    function deshabilitarBotonJugar() { 
      btnJugar.disabled = true; // Deshabilitamos el botón "A jugar!" 
      btnJugar.style.backgroundColor = 'gray'; // Cambiamos el color de fondo del botón a gris cuando está deshabilitado
      btnJugar.style.cursor = 'not-allowed'; // Cambiamos el cursor del botón a "no permitido" mientras esté deshabilitado
    }
  
    // Función para habilitar el botón "A jugar!"
    function habilitarBotonJugar() {
      btnJugar.disabled = false; // Ahora habilitamos el botón "A jugar!"
      btnJugar.style.backgroundColor = ''; // Regresamos el color original de fondo del botón
      btnJugar.style.cursor = 'pointer'; // El cursor aparece como manita al pasar sobre el botón
    }

    // Función para agregar un amigo a la lista
    function agregarAmigo() {
      const nombre = nombreAmigo.value.trim(); // Obtenemos el valor del input y eliminamos los espacios en blanco
      const genero = generoAmigo.value; // Obtenemos el valor del género seleccionado

      // Validamos que no esté vacío y que no supere el máximo de amigos
      if (nombre && amigos.length < 8) { 
        // Obtener una imagen aleatoria no repetida para el género seleccionado
        const imagen = obtenerImagenAleatoria(genero);
  
        const nuevoAmigo = { // Creamos un objeto con el nombre e imagen del amigo 
          nombre,
          imagen
        };
  
        amigos.push(nuevoAmigo); // Agregamos el amigo a la lista
        mostrarAmigos(); // Mostramos los amigos en el HTML
        
        // Solo deshabilitamos el botón si se alcanzó el máximo de amigos
        if (amigos.length >= 8) {
          deshabilitarBotonAgregar();
        }
        
        nombreAmigo.value = ""; // Limpiamos el input del nombre
        nombreAmigo.focus(); // Ponemos el foco en el input para agregar otro amigo
      } 
      else { // Si el nombre está vacío o ya alcanzamos el máximo de amigos
        alert("El nombre está vacío o ya alcanzaste el máximo de 8 amigos.");
      }
    }
    
    // Evento de tecla "Enter" en el campo de nombre
    nombreAmigo.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir el comportamiento predeterminado
        // Verificar si el botón de agregar está habilitado
        if (!btnAgregar.disabled) {
          agregarAmigo(); // Llamar a la función para agregar un amigo
        }
      }
    });
    
    // Al hacer clic en "Agregar amigo" vamos a agregar un amigo a la lista de amigos
    btnAgregar.addEventListener("click", agregarAmigo);
  
    // Función para mostrar los amigos en la lista de amigos que se verá reflejada en el HTML
    function mostrarAmigos() {
      const listaAmigos = document.getElementById("listaAmigos"); // Variable para almacenar la lista de amigos en el HTML
      listaAmigos.innerHTML = ""; // Limpiamos la lista de amigos antes de mostrar los amigos
      amigos.forEach((amigo) => { // Por cada amigo en el array de amigos... 
        const amigoDiv = document.createElement("div"); // Creamos una cajita "div" para el amigo (dentro del HTML)
        amigoDiv.classList.add("amigo"); // Le agregamos la clase "amigo" al div para darle estilos
        amigoDiv.innerHTML = `
          <img src="${amigo.imagen}" alt="Imagen de ${amigo.nombre}" />
          <p>${amigo.nombre}</p>`; // Agregamos la imagen y el nombre del amigo al div creado
        listaAmigos.appendChild(amigoDiv); // Agregamos el div del amigo a la lista de amigos dentro del HTML
      });
    }
  
    // Al hacer clic en "Sortear amigo" vamos a elegir un amigo ganador
    btnSortear.addEventListener("click", () => {
      if (amigos.length === 0) { // Si no hay amigos en la lista...
        alert("No hay amigos en la lista para hacer el sorteo."); // Mostramos un mensaje de alerta
        return; // Salimos de la función
      }
  
      // Elegimos un índice aleatorio para obtener al amigo ganador 
      const indiceGanador = Math.floor(Math.random() * amigos.length); // Elegimos un índice aleatorio entre 0 y la cantidad de amigos de la lista "amigos"
      const amigoGanador = amigos[indiceGanador]; // Obtenemos al amigo ganador con el índice aleatorio obtenido

      // Reproducir sonido de celebración
      audioSorteo.currentTime = 0; // Reiniciar el audio si ya se estaba reproduciendo
      audioSorteo.play().catch(error => console.log("Error al reproducir el audio:", error));
  
      // Cambiar la imagen en el div circle-img
      circleImg.innerHTML = `
        <img src="${amigoGanador.imagen}" alt="Ganador: ${amigoGanador.nombre}" />`; // Mostramos la imagen del amigo ganador en el lugar del div circle-img en el HTML
  
      // Actualizamos el nombre del ganador y creamos un nuevo botón para reiniciar el juego
      nombreGanador.innerHTML = `
        <h3>¡Amigo ganador!</h3>
        <p>${amigoGanador.nombre}</p>
        <button id="btnReiniciar" class="btn">Volver a jugar</button>`; // Mostramos el nombre del amigo ganador y habilitamos un nuevo botón, "Volver a jugar"
      const btnReiniciar = document.getElementById('btnReiniciar'); // guardamos dentro de una variable el botón "Volver a jugar" del HTML
      btnReiniciar.addEventListener('click', function() { // Agregamos un nuevo evento  al hacer click en el botón "Volver a jugar"
        location.reload(); // Recargamos la página desde 0 para reiniciar el juego y volver a jugar
      });
  
      // Habilitamos el botón "A jugar!" 
      habilitarBotonJugar(); // Habilitamos el botón "A jugar!"
    });
  
    btnJugar.addEventListener('click', function() { // al hacer click en el botón "Jugar", se activa el siguiente evento...
      nombreAmigo.focus(); // Hacer foco en el input del nombre del amigo para que el usuario pueda escribir el nombre
      deshabilitarBotonJugar(); // Deshabilitar el botón "Jugar" 
    });
  
    generoAmigo.addEventListener('change', function() { // Agregamos un nuevo evento en el select del género del amigo
      if (generoAmigo.value) { // Si se selecciona un género...
        habilitarBotonAgregar(); // Habilitar el botón "Agregar amigo"
      } else {  // Si no se selecciona un género...
        deshabilitarBotonAgregar(); // Deshabilitar el botón "Agregar amigo"
      }
    });
  
    // Inicialmente deshabilitar el botón
    deshabilitarBotonAgregar(); // Deshabilitamos el botón "Agregar amigo"
  });
