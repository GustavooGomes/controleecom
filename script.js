let currentIframe = 1;
let loadingMessages = [
    'Carregando informações do dashboard de <span class="dashboard-vendas">Vendas</span>...',
    'Carregando informações do dashboard de <span class="dashboard-ruptura">Ruptura</span>...',
    'Carregando informações do dashboard de <span class="dashboard-logistica">Logística</span>...',
    'Pronto!'
];
let loadingIndex = 0;

function switchIframe() {
    const containers = document.querySelectorAll('.iframe-container, .image-container');
    containers.forEach((container, index) => {
        container.classList.remove('active');
    });

    containers[currentIframe - 1].classList.add('active');
    currentIframe = (currentIframe % containers.length) + 1;
}

function showWarning() {
    const warning = document.getElementById('warning');
    warning.style.display = 'block';
    setTimeout(() => {
        location.reload();
    }, 5000); // 5 segundos para reiniciar a página
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

setInterval(switchIframe, 30000); // Alterna a cada 30 segundos

setInterval(showWarning, 600000); // Mostra o aviso a cada 5 minutos

    // Registrar o Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    }


function nextIframe() {
    switchIframe();
}
