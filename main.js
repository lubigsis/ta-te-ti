//array bidimensional
const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  
  let turno = 0; //0 user, 1 = pc
  const boardElement = document.querySelector("#boardJS");
  const playerDiv = document.querySelector("#playerJS");

  renderBoard();
  /*--------------------------------------------------------------------------------------------------*/
//recorro el array bidimensional
  function renderBoard() {
    const html = board.map((row) => {
      const cells = row.map((cell) => {
        return `<button class="cell">${cell}</button>`;
      });
      return `<div class="row">${cells.join("")}</div>`;
    });
  
    boardElement.innerHTML = html.join("");
  }