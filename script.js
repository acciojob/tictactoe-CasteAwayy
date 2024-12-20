const inputSection = document.getElementById('input-section');
        const gameSection = document.getElementById('game-section');
        const boardElement = document.getElementById('board');
        const messageElement = document.getElementById('message');
        const submitButton = document.getElementById('submit');


        let players = [];
        let currentPlayerIndex = 0;
        let board = Array(9).fill(null);

        //winning combi

        const winningCombinations = 
        [
          [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
        ];

        function createBoard(){
          boardElement.innerHTML = '';
          for(let i = 1; i <= 9; i++){
            const cell = document.createElement('div');
            cell.id = Number(i);
            cell.addEventListener('click', () => handleCellClick(i));
            boardElement.appendChild(cell);
          }
        }


        function handleCellClick(index){
          if(board[index] || checkWinner()) return;
          
          if(currentPlayerIndex === 0){
            board[index] = 'x';
          }else{
            board[index] = 'o';
          }
          
          document.getElementById(index).textContent = board[index];
          if(checkWinner()){
            messageElement.textContent = `${players[currentPlayerIndex]} congratulations you won!`;
          }else if(board.every(cell=>cell)){
            messageElement.textContent = "It's a Draw";
          }else{
            currentPlayerIndex = 1 - currentPlayerIndex;
            messageElement.textContent = `${players[currentPlayerIndex]}, you're up`
          }
        }

        function checkWinner(){
          return winningCombinations.some(combination=>
          combination.every(index => board[index] === (currentPlayerIndex === 0 ? 'x' : 'o'))
          );
        }

        submitButton.addEventListener('click', () => {
          const player1 = document.getElementById('player1').value.trim();
          const player2 = document.getElementById('player2').value.trim();
          
          if(!player1 || !player2){
            alert('Please enter the name of both player');
            return;
          }
          
          players = [player1, player2];
          currentPlayerIndex = 0;
          inputSection.style.display = 'none';
          gameSection.style.display = 'block';
          messageElement.textContent = `${players[0]}, you're up`;
          createBoard();
          
        })
