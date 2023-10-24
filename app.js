function GameBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];
 

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

    return { getBoard, dropToken, printBoard, };
  }

  function Cell() {
    let value = '';
  
    const addToken = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      addToken,
      getValue,
    };
  }
  
  function GameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const board = GameBoard();
  
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
    const setPlayers = (p1, p2) =>{
      players[0].name = p1;
      

     
      players[1].name = p2;

    }
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

  //tie condition 
 if (
        boardData[0][0].getValue() !== '' &&
        boardData[0][1].getValue() !== '' &&
        boardData[0][2].getValue() !== '' &&
        boardData[1][0].getValue() !== '' &&
        boardData[1][1].getValue() !== '' &&
        boardData[1][2].getValue() !== '' &&
        boardData[2][0].getValue() !== '' &&
        boardData[2][1].getValue() !== '' &&
        boardData[2][2].getValue() !== '' 
         ) {
        return 'draw'
      }
      return null;
    };
  
    const printNewRound = () => {
      const winner = checkForWinner();
      const playerTurnDiv = document.querySelector('.turn');
      if (winner === 'draw') {
          playerTurnDiv.textContent = "It's a tie!";
      } else if (winner) {
        playerTurnDiv.textContent = `${winner} wins!`;
    } 
      else {
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
      printNewRound,
      setPlayers,
    };
  }
  
  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const reset = document.querySelector('.reset_btn') ;
    const addBtn = document.querySelector('.add_btn');
    const firstInput = document.getElementById('first_player');
    const secondInput = document.getElementById('second_player');
    const gameBoard = GameBoard();

    
    const updateScreen = () => {
      boardDiv.innerHTML = '';
      const boardData = game.getBoard();
      const activePlayer = game.getActivePlayer();
        // playerTurnDiv.textContent = game.checkForWinner()
        //   ? `${activePlayer.name}'s turn.`
        //   : "It's a tie!";
        gameBoard.printBoard()
  
    reset.addEventListener('click', () =>{
        ScreenController() 
      })
      addBtn.addEventListener('click', () =>{
 game.setPlayers(firstInput.value, secondInput.value);
 game.printNewRound()
       
      })
      
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
  