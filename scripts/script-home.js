let player;
let isPlaying = false;
let currentTrackIndex = 0;

// Lista de vídeos
const playlist = [
  { id: "aUKbzNt0viA" },
  { id: "cNGjD0VG4R8" },
  { id: "GiXHRwNTu_I" },
];

function loadTrack(index) {
  if (index >= 0 && index < playlist.length) {
    currentTrackIndex = index;
    const videoId = playlist[currentTrackIndex].id;
    player.loadVideoById(videoId);

    // Sempre que mudar de faixa, inicie o vídeo e atualize o ícone
    player.playVideo();
    isPlaying = true;
    atualizarIconePlayPause(); // Atualiza o ícone
  }
}

// Função para atualizar o ícone de play/pause
function atualizarIconePlayPause() {
  const playPauseIcon = document.getElementById("play-pause-icon");

  if (isPlaying) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("audio-placeholder", {
    height: "0",
    width: "0",
    videoId: playlist[currentTrackIndex].id,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange, // Adiciona o ouvinte de estado
    },
    playerVars: {
      autoplay: 0,
      loop: 1,
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    if (currentTrackIndex < playlist.length - 1) {
      loadTrack(currentTrackIndex + 1); // Carrega a próxima música
      player.playVideo(); // Reproduz o vídeo automaticamente
      isPlaying = true; // Atualiza o estado de reprodução
    } else {
      loadTrack(0); // Reinicia a playlist quando todas as músicas terminarem
      player.playVideo(); // Reproduz o vídeo automaticamente
      isPlaying = true; // Atualiza o estado de reprodução
    }
  }
}

function onPlayerReady(event) {
  player.setVolume(30); // Define o volume inicial para 30%

  const playPauseBtn = document.getElementById("play-pause-btn");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const previousBtn = document.getElementById("previous-btn");
  const nextBtn = document.getElementById("next-btn");
  const volumeUpBtn = document.getElementById("volume-up-btn");
  const volumeDownBtn = document.getElementById("volume-down-btn");

  // Inicializa o ícone como "play"
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      player.pauseVideo();
      playPauseIcon.classList.remove("fa-pause");
      playPauseIcon.classList.add("fa-play");
    } else {
      player.playVideo();
      playPauseIcon.classList.remove("fa-play");
      playPauseIcon.classList.add("fa-pause");
    }
    isPlaying = !isPlaying;
  });

  previousBtn.addEventListener("click", () => {
    if (currentTrackIndex > 0) {
      loadTrack(currentTrackIndex - 1);
    } else {
      loadTrack(playlist.length - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentTrackIndex < playlist.length - 1) {
      loadTrack(currentTrackIndex + 1); // Carrega a próxima música
    } else {
      loadTrack(0); // Reinicia a playlist quando todas as músicas terminarem
    }
    player.playVideo(); // Reproduz o vídeo automaticamente
    isPlaying = true; // Atualiza o estado de reprodução
    atualizarIconePlayPause(); // Atualiza o ícone de acordo com o estado de reprodução
  });

  volumeUpBtn.addEventListener("click", () => {
    let currentVolume = player.getVolume();
    if (currentVolume < 100) {
      player.setVolume(currentVolume + 10);
    }
  });

  volumeDownBtn.addEventListener("click", () => {
    let currentVolume = player.getVolume();
    if (currentVolume > 0) {
      player.setVolume(currentVolume - 10);
    }
  });
}

const dataInicio = new Date('2013-12-14');
const dataAtual = new Date();

// Diferença em milissegundos
const diferencaTempo = dataAtual - dataInicio;

// Convertendo para anos, meses e minutos
const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25; // Considerando anos bissextos
const milissegundosPorDia = 1000 * 60 * 60 * 24; // Aproximadamente 30.44 dias por mês

// Anos completos
const anosJuntos = Math.floor(diferencaTempo / milissegundosPorAno);

// Calculando meses totais
const diasJuntos = Math.floor(diferencaTempo / milissegundosPorDia);

// Minutos totais
const minutosJuntos = Math.floor(diferencaTempo / (1000 * 60));

// Formatando os valores para o formato brasileiro
const anosFormatados = anosJuntos.toLocaleString('pt-BR');
const diasFormatados = diasJuntos.toLocaleString('pt-BR');
const minutosFormatados = minutosJuntos.toLocaleString('pt-BR');

// Exibindo o resultado no HTML
document.getElementById('anos-juntos').textContent = `${anosFormatados}`
document.getElementById('dias-juntos').textContent = `${diasFormatados}`
document.getElementById('minutos-juntos').textContent = `${minutosFormatados}`

// Pega o botão
const scrollTopBtn = document.getElementById('botao-scroll');

// Mostra o botão quando o usuário rolar 20px para baixo
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Rola para o topo da página quando o usuário clicar no botão
scrollTopBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Rolagem suave
  });
};

// Script para formulário de confirmação de presença
document.getElementById("formulario-infos").addEventListener("submit", function(event){
  event.preventDefault(); // Evita o envio padrão do formulário
  const formData = new FormData(this);

  // Converte todos os campos para texto
  formData.set("familiares", String(formData.get("familiares")));
  formData.set("celular", String(formData.get("celular")));

  fetch("https://script.google.com/macros/s/AKfycbyMxP2MkGrPDF28mrrWePOR-kp1RaYoofWZ7Vseh0QPTTpOILq3UtGYEtY6npiL09TM/exec", {
      method: "POST",
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert("Informações enviadas com sucesso!"); // Exibe o pop-up de confirmação
      this.reset(); // Limpa os campos do formulário
  })
  .catch(error => alert("Erro: " + error));
});

