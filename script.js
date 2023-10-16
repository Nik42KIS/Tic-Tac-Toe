
const gameBoard = (()=> {
    const wrap = document.querySelector('.game');
    

    let board = [
        'X','O','O',
        'O','X','O',
        'O','O','X',        
    ]

    board.forEach((el)=>{
        const cell = document.createElement('div');
        cell.classList.add('cell');
        wrap.appendChild(cell);
        cell.textContent = el
    })



})()