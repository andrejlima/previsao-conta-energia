let dateRef = document.querySelector('#dataReferencia');
let leitRef = document.querySelector('#LeituraReferencia');
let leitAtual = document.querySelector('#LeituraAtual');
let result = document.querySelector('#result');
let mKwh = document.querySelector('#mediaKwh');

// recuperando dados de coockies

let dateReference = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('dateReference=')).split('=')[1])) || null;
let leitReference = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('leitReference=')).split('=')[1])) || null;
let leitActual = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('leitActual=')).split('=')[1])) || null;
let mKwhCk = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('mKwhCk=')).split('=')[1])) || null;

function valorMedio() {
    let valorMensal = prompt("Digite o valor da sua última conta:");

    if (valorMensal === null) {
        return;
    }

    while (valorMensal === null || valorMensal === "") {
        valorMensal = prompt("Digite o valor da sua última conta:");

        if (valorMensal === null) {
            return;
        }
    }

    let mensalKwh = prompt("Digite a quantidade de kilowatts da sua última conta:");

    if (mensalKwh === null) {
        return;
    }

    while (mensalKwh === null || mensalKwh === "") {
        mensalKwh = prompt("Digite a quantidade de kilowatts da sua última conta:");

        if (mensalKwh === null) {
            return;
        }
    }

    valorMensal = parseFloat(valorMensal);
    mensalKwh = parseInt(mensalKwh);

    let mediaKwhValue = valorMensal / mensalKwh;

    alert('seu valor médio é: ' + (mediaKwhValue).toFixed(2));

    document.getElementById("mediaKwh").value = (mediaKwhValue).toFixed(2);

}

// Função para formatar o campo conforme o usuário digita
function formatarCampo() {
    // Pegar o valor do campo
    let campo = document.getElementById("mediaKwh").value;

    // Remover qualquer caractere que não seja dígito
    campo = campo.replace(/[^\d]/g, '');

    // Verificar se há dígitos suficientes para representar os centavos
    if (campo.length >= 1) {
        // Formatar o valor dos centavos
        let centavos = campo.substring(campo.length - 2);
        campo = campo.substring(0, campo.length - 2) + '.' + centavos;
    }

    // Converter para número
    let numero = parseFloat(campo);

    // Verificar se é um número válido
    if (!isNaN(numero)) {
        // Formatar para reais com vírgulas e pontos
        let valorFormatado = (numero.toFixed(2)).toLocaleString('pt-BR');

        // Atualizar o valor do campo
        document.getElementById("mediaKwh").value = valorFormatado;
    }

}

// Adicionar evento de entrada ao campo para chamar a função de formatação
document.getElementById("mediaKwh").addEventListener("input", formatarCampo);

//exibindo valores salvos dos cookies

dateRef.value = dateReference;
leitRef.value = leitReference;
leitAtual.value = leitActual;
mKwh.value = mKwhCk;

function calculo() {
    let dateInicial = new Date(dateRef.value);
    let dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    // Calculando a diferença em milissegundos
    let milliseconds = Math.abs(dateToday - dateInicial);

    // Convertendo a diferença de milissegundos para dias
    let diferencaEmDias = Math.ceil((milliseconds - 10800000) / (1000 * 3600 * 24));

    let leitReference = leitRef.value;
    let leitActual = leitAtual.value;
    let difLeit = leitActual - leitReference;
    let dateReference = dateRef.value;
    let mKwhCk = mKwh.value;

    //salvar dados nos cookies

    let dateRefJason = JSON.stringify(dateReference);
    let leitRefJason = JSON.stringify(leitReference);
    let leitActualJason = JSON.stringify(leitActual);
    let mKwhCkJason = JSON.stringify(mKwhCk);

    document.cookie = "dateReference=" + encodeURIComponent(dateRefJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    document.cookie = "leitReference=" + encodeURIComponent(leitRefJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    document.cookie = "leitActual=" + encodeURIComponent(leitActualJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    document.cookie = "mKwhCk=" + encodeURIComponent(mKwhCkJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";

    //calculo do resultado

    let resultFinal = ((difLeit / diferencaEmDias * 30) * mKwh.value).toFixed(0);

    result.innerHTML = `R$ ${resultFinal}`;
}

//Correção exibição de data no firefox

function detectarNavegador() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Firefox") !== -1) {
        dateRef.style.textAlign = "center";
        dateRef.style.width = "7.3rem";
        dateRef.style.fontSize = "0.85rem";
    }
}

detectarNavegador();