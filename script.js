


const gameBoard = (()=> {
    let flag = true;
    const wrap = document.querySelector('.game');
    

    let board = [
       ['', '', ''],
       ['', '', ''],
       ['', '', ''],
    ]

    board.map((el)=>{
        el.map(()=>{
            const cell = document.createElement('div');
        
            cell.classList.add('cell');
            wrap.appendChild(cell);
            cell.addEventListener('click', (e) =>{
    
              
                // flag ? e.target.textContent = 'X' flag = !flag : e.target.textContent = 'O'
                if(flag && e.target.textContent == ''){
                    e.target.textContent = 'X';
                     flag = !flag
                } else if(!flag && e.target.textContent == ''){
                    e.target.textContent = 'O';
                    flag = !flag
                }
            })
       
        })
        
    })


        return {board}
})()

const gameController = (function(){
        players = [
        playerFirst = {
            value: 'O' 
        }, 
        playerSecond = {
            value: 'X'
        },
    ]; 

    const activePlayer = players[0];
    const changeActivePlayer = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        
        return getActivePlayer
    }
    const getActivePlayer = () => activePlayer
    return { changeActivePlayer }
})()