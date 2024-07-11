let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

/*
Função que seleciona o nome da Tag(elemento HTML) e, adiciona também um texto como parâmetros
*/
function exibirNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male');
}

//Funão que exibie o texto inicial utilizando da função exibir na tela colocando por parâmetros a Tag e o texto
function exibirMensagemInicial(){
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();

//função que verifica se o chute que o usuário digitou é o número secreto
function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirNaTela('p', 'O número secreto é menor.');
        }else{
            exibirNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    
    //variável que armazena um número aleatório gerado pelo método random do objeto Math
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    //variável que armazena a quantidade de números que há na lista
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    /*
    Estrutura condicional que verifica se a quantidade de números que há na lista 
    é igual a variável que estabelece o limite de números a serem digitados pelo usuário.
    */
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    /*
    Estrutura condicional que verifica se já existe um número incluso na lista,
    se for verdadeiro retornará o que a função gerarNumeroAleatorio() gerou, 
    no caso será um número inteiro de 1 a 10; senão será adicionado um número a lista,
    sendo o mesmo valor da variável que armazena o número aletório e, retornará como valor da função,
    o valor da variável numeroEscolhido.
    */
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//função que limpa o campo de entrada de dados do jogo
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

//função que reinicia o jogo, sendo que só estará disponível quando o usuário acertar o número secreto
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

