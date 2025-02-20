// Autor: Isra Durán J.
document.addEventListener('DOMContentLoaded', function() { // Evento que se ejecuta cuando el contenido del DOM está cargado
    const btnJugar = document.getElementById('btnJugar'); // Variable para almacenar el botón "Jugar" en el HTML
    const nombreAmigo = document.getElementById('nombreAmigo'); // Variable para almacenar el input del nombre del amigo en el HTML
    const btnSortear = document.getElementById('btnSortear'); // Variable para almacenar el botón "Sortear amigo" en el HTML
    const generoAmigo = document.getElementById('generoAmigo'); // Variable para almacenar el select del género del amigo en el HTML
    const btnAgregar = document.getElementById('btnAgregar');  // Variable para almacenar el botón "Agregar amigo" en el HTML
    const circleImg = document.querySelector('.circle-img'); // Variable para almacenar el div de la imagen del ganador en el HTML
    const nombreGanador = document.getElementById('nombreGanador'); // Variable para almacenar el div del nombre del ganador en
  
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
  
    // Al hacer clic en "Agregar amigo" vamos a agregar un amigo a la lista de amigos
    btnAgregar.addEventListener("click", () => {
      const nombre = nombreAmigo.value.trim(); // Obtenemos el valor del input y eliminamos los espacios en blanco al inicio y al final y los almacenamos en la variable "nombre"
      const genero = generoAmigo.value; // Obtenemos el valor del select del género del amigo y lo almacenamos en la variable "genero"
  
      // primero validamos que no esté vacío y que no supere una cierta cantidad amigos
      if (nombre && amigos.length < 8) { // Si el nombre no está vacío y la cantidad de amigos es menor a 8
        let imagen; // creamos una variable para almacenar la URL de la imagen del amigo 
        if (genero === "femenino") { // Si el usuario eligió que el género es femenino...
          imagen = imagenesFemeninas[amigos.length % imagenesFemeninas.length]; // De la lista de "imagenesFemeninans", asignamos una imagen a la variable "imagen"
        } else {  // Si no es femenino, asumimos que es masculino...
          imagen = imagenesMasculinas[amigos.length % imagenesMasculinas.length]; // Entonces de lo contrario, asignamos una imagen de la lista de "imagenesMasculinas" a la variable "imagen"
        }
  
        const nuevoAmigo = { // Luego creamos un objeto "nuevoAmigo" con las siguientes propiedades... 
          nombre, // Propiedad nombre
          imagen // Propiedad imagen
        };
  
        amigos.push(nuevoAmigo); // Agregamos EL objeto "nuevoAmigo" junto con su nombre e imagen a la lista "amigos"
        mostrarAmigos(); // Llamamos a la función "mostrarAmigos" para mostrar la lista de amigos en el HTML
        deshabilitarBotonAgregar(); // Deshabilitamos el botón "Agregar amigo" mientras no se seleccione nuevamente un género o si se alcanza el máximo de amigos
        nombreAmigo.value = ""; // Volvemos a impiarf el input del nombre después de agregar un amigo
      } 
      else { // Pero, si el nombre está vacío o ya alcanzaste el máximo de 8 amigos...
        alert("El nombre está vacío o ya alcanzaste el máximo de 8 amigos."); // Mostramos el siguiente mensaje de alerta...
      }
    });
  
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
