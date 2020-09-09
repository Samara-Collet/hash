//De quem é a vez agora?
//Quais células cada jogador selecionou?
//Algum dos jogadores selecionou alguma combinação vencedora (ou seja, 3-em-linha)?

//armazenar a resposta das duas primeiras perguntas:
let currentPlayer = 'X';
let nextPlayer = 'O';

let playerXSelections = [];
let playerOSelections = [];

//constante array de arrays para armazenar a possível combinação de vitória de nossa tabela 3x3:
const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// O código abaixo faz o seguinte:
//1. Cria uma função chamada handleClick(). Por enquanto, isso só registra o ID da célula que foi clicada.
//2. Obtém um array de todas as células usando document.querySelectorAll()
//3. Itera essas células para adicionar um Listener de Evento
const handleClick = function(event) {
    const cell = event.target;
    // alert(`Proximo jogador é ${nextPlayer}`)
    
    //vamos imprimir o caractere do jogador atual (X ou O) no tabuleiro e alternar o jogador
    //vamos armazenar a nova seleção no array de seleção do jogador apropriado.
    cell.innerHTML = currentPlayer;
    cell.className = "animate__animated animate__flipInX"

    if (currentPlayer === 'X' ) {
        playerSelections = playerXSelections;
        nextPlayer = 'O';
    } else {
        playerSelections = playerOSelections;
        nextPlayer = 'X';
    }

    playerSelections.push(Number(cell.id));

    //verificar vencedores
    if (checkWinner(playerSelections)) {
        alert('Jogador ' + currentPlayer + ' venceu!');
        resetGame();
    }
    
    //reset game
    if (checkDraw()) {
        alert('Velha!');
        resetGame();
    }

    // troca de jogadores
    currentPlayer = nextPlayer;
}

const cells = document.querySelectorAll('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

//verificar se o jogador atual tem todas as células de alguma combinação de vitória.
//Vamos começar com alguns loops aninhados em pseudo-código
function checkWinner() {
    // Verifica para cada combinação  se o jogador tem todos os valores

    //percorre o array das possiveis vitorias
    for (let i = 0; i < winningCombinations.length; i++){
        matches = 0

        // percorre o array das seleções do jogador
        for (let j = 0; j < playerSelections.length; j++){

            // se o valor combina com algum valor do array de vitorias, matches recebe +1
            if (winningCombinations[i].includes(playerSelections[j])) {
                matches++
            } 

            // quando matches arrecadar 3 valores que combinam com o array de vitorias = vitória
            if (matches === 3) {
                return true
            }
        }
    }
    // Se nós percorremos todas as combinações sem retornar true
    // então o jogador não venceu
    return false
 }

//Há várias maneiras de verificar um empate. Uma delas é ver se os jogadores selecionaram 9 células.
 function checkDraw() {
    return (playerOSelections.length + playerXSelections.length) >= cells.length;
 }

//Para reiniciar o tabuleiro, precisamos limpar as seleções dos jogadores e apagar os Xs e Os.
 function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
 }