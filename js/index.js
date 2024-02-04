let dateRef = document.querySelector('#dataReferencia');
let leitRef = document.querySelector('#LeituraReferencia');
let leitAtual = document.querySelector('#LeituraAtual');
let result = document.querySelector('#result');

// recuperando dados de coockies

let dateReference = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('dateReference=')).split('=')[1])) || null;
let leitReference = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('leitReference=')).split('=')[1])) || null;
let leitActual = JSON.parse(decodeURIComponent(document.cookie.split('; ').find(cookie => cookie.startsWith('leitActual=')).split('=')[1])) || null;

//exibindo valores salvos dos cookies

dateRef.value = dateReference;
leitRef.value = leitReference;
leitAtual.value = leitActual;

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

    //salvar dados nos cookies
    
    let dateRefJason = JSON.stringify(dateReference);
    let leitRefJason = JSON.stringify(leitReference);
    let leitActualJason = JSON.stringify(leitActual);

    document.cookie = "dateReference=" + encodeURIComponent(dateRefJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    document.cookie = "leitReference=" + encodeURIComponent(leitRefJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    document.cookie = "leitActual=" + encodeURIComponent(leitActualJason) + "; expires=" + new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";

    //calculo do resultado
    
    let resultFinal = (difLeit / diferencaEmDias * 30).toFixed(0);

    result.innerHTML = `R$ ${resultFinal}`;
}