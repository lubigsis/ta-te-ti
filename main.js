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
    renderPlayer();
  
    if (turno === 0) {
      playerPlays();
    } else {
      PCPlays();
    }
  }

  //--------------------------------------------------------------Turnos jugadores
  function renderPlayer() {
    document.querySelector("#playerJS").textContent = 
    `${turno === 0 ? "Turno usuario" : "Turno PC"}`;
  }
