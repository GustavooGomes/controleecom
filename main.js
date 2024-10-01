let currentIframe = 1;
let timeOut = 30000;
let loadingMessages = [
    'Carregando informações do dashboard de <span class="dashboard-vendas">Vendas</span>...',
    'Carregando informações do dashboard de <span class="dashboard-logistica">Logística</span>...',
    'Carregando informações do dashboard de <span class="dashboard-ruptura">Ruptura</span>...',
    'Carregando informações do dashboard do <span class="dashboard-vendas">Varejo</span>...',
    'Carregando informações do dashboard do <span class="dashboard-meli">Mercado Livre</span>...',
    'Carregando calendário de <span class="dashboard-logistica">Coleções</span>...',
    'Pronto!'
];
let loadingIndex = 0;
preloadIframes();
function switchIframe() {
    const containers = document.querySelectorAll('.iframe-container, .image-container');
    containers.forEach((container, index) => {
        container.classList.remove('active');
    });

    containers[currentIframe - 1].classList.add('active');
    currentIframe = (currentIframe % containers.length) + 1;
}



function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const backgroundScreen = document.getElementById('background-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        backgroundScreen.style.display = 'none';
    }, 1000); // Tempo para a transição de opacidade
}

function iframeLoaded() {
    hideLoadingScreen();
}

function updateLoadingText() {
    const loadingText = document.getElementById('loading-text');
    loadingText.innerHTML = loadingMessages[loadingIndex];
    loadingIndex++;
    if (loadingIndex >= loadingMessages.length) {
        setTimeout(hideLoadingScreen, 1000); // Esconde a tela de carregamento após a última mensagem
    }
}


function preloadIframes() {
const iframes = document.querySelectorAll('iframe');
let loadedCount = 0;
iframes.forEach(iframe => {
iframe.onload = () => {
    loadedCount++;
    if (loadedCount === iframes.length) {
        iframeLoaded();
    }
};
});
}

var nextFrame = setInterval(switchIframe, timeOut)


window.onload = function() {
    document.getElementById('iframe1').classList.add('active');
    preloadIframes();
    updateLoadingText(); // Inicializa o texto de carregamento imediatamente
    setInterval(updateLoadingText, 3000); // Atualiza o texto de carregamento a cada 5 segundos
}
function nextIframe() {
    switchIframe();
}
function toggleFreezeIframe() {
    const stopButton = document.getElementById("stp-btn").querySelector("i");
    if (stopButton.classList.contains("fa-pause")) {
        clearInterval(nextFrame);
        stopButton.classList.remove("fa-pause");
        stopButton.classList.add("fa-play");
    } else {
        nextFrame = setInterval(switchIframe, timeOut);
        stopButton.classList.remove("fa-play");
        stopButton.classList.add("fa-pause");
    }
}
