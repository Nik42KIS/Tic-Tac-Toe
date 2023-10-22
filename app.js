function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const reset = document.querySelector('.reset') ;

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = Cell();
      }
    }

    const getBoard = () => board;
  
    const dropToken = (row, col, player) => {
      const cell = board[row][col];
      if (cell.getValue() === '') {
        cell.addToken(player);
        return true;
      }
      return false;
    };
  
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
      console.log(boardWithCellValues);
    };
  
    return { getBoard, dropToken, printBoard };
  }
  
  function Cell() {
    let value = '';
  
    const addToken = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      restart,
      addToken,
      getValue,
    };
  }
  
  function GameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 'X',
      },
      {
        name: playerTwoName,
        token: 'O',
      },
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
  
    const getActivePlayer = () => activePlayer;
  
    const checkForWinner = () => {
      const boardData = board.getBoard();
  
      for (let i = 0; i < 3; i++) {
        if (
          boardData[i][0].getValue() !== '' &&
          boardData[i][0].getValue() === boardData[i][1].getValue() &&
          boardData[i][0].getValue() === boardData[i][2].getValue()
        ) {
          return boardData[i][0].getValue();
        }
  
        if (
          boardData[0][i].getValue() !== '' &&
          boardData[0][i].getValue() === boardData[1][i].getValue() &&
          boardData[0][i].getValue() === boardData[2][i].getValue()
        ) {
          return boardData[0][i].getValue();
        }
      }
  
      if (
        boardData[0][0].getValue() !== '' &&
        boardData[0][0].getValue() === boardData[1][1].getValue() &&
        boardData[0][0].getValue() === boardData[2][2].getValue()
      ) {
        return boardData[0][0].getValue();
      }
  
      if (
        boardData[0][2].getValue() !== '' &&
        boardData[0][2].getValue() === boardData[1][1].getValue() &&
        boardData[0][2].getValue() === boardData[2][0].getValue()
      ) {
        return boardData[0][2].getValue();
      }
  
      return null;
    };
  
    const printNewRound = () => {
      const winner = checkForWinner();
      const playerTurnDiv = document.querySelector('.turn');
      if (winner) {
        if (!winner ) {
          playerTurnDiv.textContent = "It's a tie!";
        } else {

          playerTurnDiv.textContent = `${winner} wins!`;
        }
      } else {
        playerTurnDiv.textContent = `${getActivePlayer().name}'s turn.`;
      }
    };
  
    const playRound = (row, col) => {
      if (checkForWinner() || board.getBoard()[row][col].getValue() !== '') {
        return;
      }
  
      board.dropToken(row, col, getActivePlayer().token);
      switchPlayerTurn();
      printNewRound();
    };
  
    printNewRound();
  
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      checkForWinner,
    };
  }
  
  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restart = document.querySelector('.reset');


    const updateScreen = () => {
      boardDiv.innerHTML = '';
      const boardData = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
    //   playerTurnDiv.textContent = game.checkForWinner()
    //     ? `${activePlayer.name}'s turn.`
    //     : "It's a tie!";
  
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = boardData[row][col];
          const cellButton = document.createElement('button');
          cellButton.classList.add('cell');
          cellButton.dataset.row = row;
          cellButton.dataset.column = col;
          cellButton.textContent = cell.getValue();
          cellButton.addEventListener('click', clickHandlerBoard);
          boardDiv.appendChild(cellButton);
        }
      }
    };
  
    function clickHandlerBoard(e) {
      const selectedRow = e.target.dataset.row;
      const selectedCol = e.target.dataset.column;
      if (selectedRow !== undefined && selectedCol !== undefined) {
        game.playRound(parseInt(selectedRow), parseInt(selectedCol));
        updateScreen();
      }
    }
    updateScreen();
  }
  
  ScreenController();
  