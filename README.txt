Atividade: Jogo da Velha
Neste famoso jogo, um jogador usa um "X" e o outro usa um "O". Os jogadores se alternam desenhando seus símbolos nas células de uma tabela 3x3. O primeiro jogador que formar uma linha com três de seus símbolos (seja horizontal, vertical ou diagonal) vence.

O jogo pode terminar em empate quando todas as células estiverem preenchidas e nenhum jogador conseguir os três símbolos em linha.

Sua Tarefa
Implementar o Jogo da Velha usando HTML, CSS e JavaScript. Nesta implementação, os jogadores estarão usando o mesmo teclado & mouse, se revezando.

Use o GitLab Pages para hospedar seu jogo finalizado de forma que qualquer pessoa possa jogá-lo online.

Implementação
Nesta avaliação, forneceremos um passo a passo.

Desenhe o Tabuleiro
Vamos começar desenhando nosso tabuleiro. Precisaremos de uma tabela 3x3, então vamos criar o index.html e abri-lo no editor. Precisamos de 3 linhas com 3 células em cada uma, então vamos adicionar o seguinte:

<body>
    <table>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>
</body>
Agora vamos abrir o index.html em nosso navegador. Não tem muita coisa nele, né? É porque nossa tabela está vazia e falta estilizá-la. Iremos estilizá-la ao criar um tictactoe.css com os seguintes estilos:

td {
  border: 1px solid blue;
}

td:hover {
  background: orange;
}

table {
  border: 1px solid green;
}
Conecte ao nosso novo estilo do index.html ao conectar a tag <head> ao nosso arquivo CSS:

<link rel="stylesheet" href="tictactoe.css">
Agora quando abrirmos o index.html no navegador, veremos nossa tabela 3x3, e as células ficam laranjas quando passamos o mouse sobre elas 💫



Certo, ainda não iremos ganhar um Webby, mas já temos alguma coisa.

💡 Este seria um excelente, momento para fazer o check in no controle de versão. Crie um novo repo no GitLab e faça o push dos nossos dois arquivos index.html e tictactoe.css antes de continuarmos.

Configurando o Estado Inicial do Jogo
Para que nosso jogo funcione, precisamos responder algumas perguntas depois de cada turno:

De quem é a vez agora?
Quais células cada jogador selecionou?
Algum dos jogadores selecionou alguma combinação vencedora (ou seja, 3-em-linha)?
Vamos criar um novo arquivo tictactoe.js e começar com algumas variáveis para armazenar a resposta das duas primeiras perguntas:

let currentPlayer = 'X';
let nextPlayer = 'O';

let playerXSelections = [];
let playerOSelections = [];
Também estaremos registrando a variável nextPlayer, que será útil mais tarde.

E criaremos um constante array de arrays para armazenar a possível combinação de vitória de nossa tabela 3x3:

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
Certifique-se de adicionar <script src="tictactoe.js"></script> logo antes do </body> em seu HTML.

💡 Adicione o novo arquivo Javascript e as alterações do seu arquivo HTML ao controle de versão antes de continuar.

Detectar Quando uma Célula é Clicada
Para que nosso Javascript saiba qual célula foi clicada, precisaremos identificar cada célula de alguma forma. Por enquanto, usaremos o atributo id dos elementos td para dar a cada célula um ID de 1 até 9.

<td id="1"></td>
<td id="2"></td>
...
<td id="9"></td>
Agora estamos prontos para adicionar um listener de evento. O código abaixo faz o seguinte:

Cria uma função chamada handleClick(). Por enquanto, isso só registra o ID da célula que foi clicada.
Obtém um array de todas as células usando document.querySelectorAll()
Itera essas células para adicionar um Listener de Evento
const handleClick = function(event) {
    const cell = event.target
    console.log(cell.id);
}

const cells = document.querySelectorAll('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}
💡 Salve seus arquivos e recarregue o index.html em seu navegador com o console Javascript aberto. Tente clicar em algumas células.

Você deve ver algo desse tipo: 

Certo, agora temos um tabuleiro que responde aos nossos eventos de clique. Agora vamos adicionar a lógica do jogo.

💡 Este é um ótimo momento para fazer um git commit .

Jogabilidade
Vamos fazer com que nossa função handleClick faça algo um pouco mais útil: vamos imprimir o caractere do jogador atual (X ou O) no tabuleiro e alternar o jogador. E já que estamos fazendo isso, vamos armazenar a nova seleção no array de seleção do jogador apropriado.

const handleClick = function (event) {
    const cell = event.target;

    cell.innerHTML = currentPlayer;

    if (currentPlayer === 'X' ) {
        playerSelections = playerXSelections;
        nextPlayer = 'O';
    } else {
        playerSelections = playerOSelections;
        nextPlayer = 'X';
    }

    playerSelections.push(Number(cell.id));

    // Swap players
    currentPlayer = nextPlayer;
}
Agora você deve ser capaz de clicar no tabuleiro e desenhar alternando entre X e O.



Abra seu console e certifique-se de que o playerXSelections e o playerOSelections contém os valores que você espera.

Verifique a combinação de vitória
Como podemos verificar se um jogador venceu?

Temos um array para a seleção de cada jogador, e um array de arrays das possíveis combinações de vitória. Queremos verificar se o jogador atual tem todas as células de alguma combinação de vitória.

Vamos começar com alguns loops aninhados em pseudo-código.

function checkWinner {
   // Verifica para cada combinação  se o jogador tem todos os valores
   for each winning combination
       matches = 0
       for each cell in combination
           if player has cell
               matches++
           else break // vai para a próxima combinação
           if there are 3 matches
               return true

   // Se nós percorremos todas as combinações sem retornar true
   // então o jogador não venceu
   return false
}
Converta este pseudo-código em um JavaScript de verdade.

💡 Dica:

Use console.log() para verificar seu trabalho enquanto progride.
“if player has cell” poderia ser escrito usando o método de array includes().
break encerra o loop atual. Trabalhar com loops aninhados significa avançar o loop externo.
return para a execução da função, encerrando todos os loops.
Evite fazer hard code do valor 3.
Verificar Empate
Há várias maneiras de verificar um empate. Uma delas é ver se os jogadores selecionaram 9 células.

function checkDraw() {
   return (playerOSelections.length + playerXSelections.length) >= cells.length;
}
Terminando o Jogo
Para reiniciar o tabuleiro, precisamos limpar as seleções dos jogadores e apagar os Xs e Os.

function resetGame() {
   playerXSelections = new Array();
   playerOSelections = new Array();
   for (let i = 0; i < cells.length; i++) {
       cells[i].innerHTML = '';
   }
}
Juntando Tudo
Nossa função handleClick() completa incorporando as novas funções deve ficar mais ou menos assim:

const handleClick = function(event) {
   const cell = event.target;

   cell.innerHTML = currentPlayer;

   if (currentPlayer === 'X' ) {
       playerSelections = playerXSelections;
       nextPlayer = 'O';
   } else {
       playerSelections = playerOSelections;
       nextPlayer = 'X';
   }

   playerSelections.push(Number(cell.id));

     if (checkWinner(playerSelections)) {
       alert('Player ' + currentPlayer + ' wins!');
       resetGame();
     }

     if (checkDraw()) {
       alert('Draw!');
       resetGame();
     }

     // Troca jogadores
     currentPlayer = nextPlayer;
}
Exemplo concluído
Aqui está um GIF de uma implementação concluída:



Próximos Passos
Quer refinar seu jogo? Aqui vão algumas ideias.

JavaScript:

Impeça que os usuários selecionem a mesma célula mais de uma vez (do jeito que está agora, um jogador pode invadir a seleção de outro jogador).
Exiba de quem é a vez.
Registre a quantidade de vitórias de cada jogador (e a quantidade de empates).
CSS:

Use cursor: pointer; para mostrar a conhecida mão com o dedo indicador estendido ao passar o mouse sobre as células.
Deixe seu tabuleiro mais bonito.
Adicione uma animação quando os Xs e Os forem adicionados ao tabuleiro.