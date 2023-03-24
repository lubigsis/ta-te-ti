//array bidimensional. Acá se colocará c/u de las jugadas (3 filas y 3 columnas). Así se evita usar k' el DOM
// p/obtener valores. Cada vez q' hay una partida o un turno, se imprime el resultado q' hay en ese Array
const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  
  let turno = 0; //(0 user, 1 = pc)
  let boardContenedor = document.querySelector("#boardJS");
  let playerDiv = document.querySelector("#playerJS");

  startGame();  


  /*-----------------------------------------------------------------------------------TABLERO---------------*/
//recorro el array bidimensional, primero los row y dsp las cell. (El método map regresa un arreglo)
  function renderBoard() {
    let html = board.map((row) => {
      let cells = row.map((cell) => {
        return `<button class="cell">${cell}</button>`;
      });
      return `<div class="row">${cells.join("")}</div>`; //se imprime una capa p!acomodr c/u de las filas
    });
  
    boardContenedor.innerHTML = html.join(""); 
  }

  //----------------------------------------------------------------
  function startGame() {
    renderBoard();
    turno = Math.random() < 0.5 ? 0 : 1; //el turno del jugador es aleatorio: (0 user, 1 = pc)
    renderCurrentPlayer();
  
    if (turno === 0) {
      playerPlays();
    } else {
      PCPlays();
    }
  }
//---------------------------------------------------------------jugadores--------------------------

function playerPlays(){
  const cells = document.querySelectorAll('.cell');
 
  cells.forEach((cell, i) => {
      const column = i % 3;  //para saber la posición en el tablero.
      const row = parseInt(i / 3);

       if (board [row][column] === ''){ //si la casilla está vacía, le pongo un listener
          cell.addEventListener('click', (e) => {

            board[row][column] = 'O';
            cell.textContent = board [row][column];

            turno = 1;
            let won = checkGanador();

            //---una vez q' el user jugó, tengo q llamar a la función p/q juegue la PC
            if (won === 'none'){
              PCPlays();    
              return;     
            }   
            if (won === 'draw') {
              renderDraw();
              cell.removeEventListener('click', this);
              return;
            }     
          });
       }                 

  });
}

//--------------------------------------------PC
function PCPlays(){                                        
  renderCurrentPlayer();
  
  
  setTimeout(() => {
    let played = false; 
    let opciones = checkIfCanWin();

    if(opciones.length > 0){
      let mejorOpcion  = opciones[0];

      for (let i = 0; i  < mejorOpcion.length; i++){
        if(mejorOpcion[i].value === 0){
          let posi = mejorOpcion[i].i;
          let posj = mejorOpcion[i].j;
          
          board[posi][posj] = 'X';
          played = true;
          break;
        }
      }
      }else {
        for(let i = 0; i < board.length; i++ ) {
         for(let j = 0; j < board[i].length; j++){
            if(board[i][j] === '' && !played){
              board[i][j] = 'X';
              played = true;
          }
        }
      }
    }
   
    turno = 0;
    renderBoard();
    renderCurrentPlayer();

    let won = checkGanador();
    if(won === 'none'){
      playerPlays();
      return;
    }
    if(won === 'draw'){
      renderDraw();
      return;
    }    
   
  }, 1500);
  
}   

//-------------
function renderDraw(){
  playerDiv.textContent = 'draw';
}

//----------------------------------FUNCIONES--------------------------------------------------------------
//regresa todas las posibles jugadas (p/q' la pc no elija al azar)
//JSON permite hacer una copia de arrglos bidimensionales
//sustituyo la copia de mi tablero por objetos
function checkIfCanWin(){  
  let arreglo = JSON.parse(JSON.stringify(board));
  
  for (let i = 0; i < arreglo.length; i++){
    for (let j = 0; j < arreglo.length; j++){
      if(arreglo[i][j] === 'X'){
        arreglo[i][j] = {
          value: 1, i, j
        };                                    //estas son las OPCIONES
      }
      if(arreglo[i][j] === ''){
        arreglo[i][j] = {          //lo q' hago es sumar valores
          value: 0, i, j
        };
      }
      if(arreglo[i][j] === 'O'){
        arreglo[i][j] = {
          value: -2, i, j
        };
      }

    }
  }
  //le asigno  a cada variable la posición de mis casillas               ESTO AGREGO
    let posicion1 = arreglo[0][0];
    let posicion2 = arreglo[0][1];
    let posicion3 = arreglo[0][2];
    let posicion4 = arreglo[1][0];
    let posicion5 = arreglo[1][1];
    let posicion6 = arreglo[0][2];
    let posicion7 = arreglo[2][0];
    let posicion8 = arreglo[2][1];
    let posicion9 = arreglo[2][2];
  
    let solucion1 = [posicion1, posicion2, posicion3];
    let solucion2 = [posicion4, posicion5, posicion6];
    let solucion3 = [posicion7, posicion8, posicion9];
    let solucion4 = [posicion1, posicion4, posicion7];
    let solucion5 = [posicion2, posicion5, posicion8];
    let solucion6 = [posicion3, posicion6, posicion9];
    let solucion7 = [posicion1, posicion5, posicion9];
    let solucion8 = [posicion3, posicion5, posicion7];


    let respuesta = [solucion1, solucion2, solucion3, solucion4, solucion5, solucion6, solucion7, solucion8].filter((linea) => {
      return(
        linea[0].value + linea[1].value + linea[2].value === 2 ||
        linea[0].value + linea[1].value + linea[2].value === -4 
      );
  });
     return respuesta;

}

  //-----------------------------------------valido ganador-----------------------------

  function checkGanador() {
    let posicion1 = board[0][0];
    let posicion2 = board[0][1];
    let posicion3 = board[0][2];
    let posicion4 = board[1][0];
    let posicion5 = board[1][1];
    let posicion6 = board[0][2];
    let posicion7 = board[2][0];
    let posicion8 = board[2][1];
    let posicion9 = board[2][2];
  
    let solucion1 = [posicion1, posicion2, posicion3];
    let solucion2 = [posicion4, posicion5, posicion6];
    let solucion3 = [posicion7, posicion8, posicion9];
    let solucion4 = [posicion1, posicion4, posicion7];
    let solucion5 = [posicion2, posicion5, posicion8];
    let solucion6 = [posicion3, posicion6, posicion9];
    let solucion7 = [posicion1, posicion5, posicion9];
    let solucion8 = [posicion3, posicion5, posicion7];

    //------------------------------------------filtrado--------------
    let respuesta = [solucion1, solucion2, solucion3, solucion4, solucion5, solucion6, solucion7, solucion8].filter((linea) => {
      return(
        linea[0] + linea[1] + linea[2] === 'XXX' ||
        linea[0] + linea[1] + linea[2] === 'OOO' 
      );
  });

  if(respuesta.length > 0){  //hay un ganador
    if(respuesta[0][0] === 'X'){
      playerDiv.textContent = 'PC GANA';
      return 'pcGana';
    }else{
      playerDiv.textContent = 'Usuario GANA';
      return 'usuarioGana';
    }
//si hay empate
  }else {
      let draw = true;
       for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === '') {
            draw = false;  //si encuentra una casilla que está vacía cambia a false
          }
     
        }

  }
  return draw? "draw" : "none";

 }
  }

  

  //--------------------------------------------------------------Turnos jugadores
  function renderCurrentPlayer() {
    playerDiv.textContent = `${turno === 0 ?'Turno Jugador' : 'Turno PC'}`;
  }
