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