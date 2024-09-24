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
const diferencaTempo = dataAtual - dataInicio;
const diasJuntos = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

const diasFormatados = diasJuntos.toLocaleString('pt-BR');

document.getElementById('tempo-juntos').textContent = `${diasFormatados} dias juntos e contando...`