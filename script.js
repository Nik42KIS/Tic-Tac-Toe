


const gameBoard = (()=> {
    let flag = true;
    const wrap = document.querySelector('.game');
    

    let board = [
        '','','',
        '','','',
        '','','',        
    ]

    board.map((el)=>{
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
   
        // cell.textContent = el
    })



})()