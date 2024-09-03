// Defina a data do evento
const eventoData = new Date("2025-11-10T16:30:00");

// Função para calcular o tempo restante
function calcularTempoRestante() {
  const agora = new Date();
  const tempoRestante = eventoData - agora;

  if (tempoRestante < 0) {
    return {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
    };
  }

  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

  return {
    dias,
    horas,
    minutos,
    segundos,
  };
}

// Função para atualizar o countdown
function atualizarCountdown() {
  const tempoRestante = calcularTempoRestante();

  // Atualiza o conteúdo dos spans existentes
  document.getElementById(
    "countdown-dias"
  ).textContent = `${tempoRestante.dias} `;
  document.getElementById(
    "countdown-horas"
  ).textContent = `${tempoRestante.horas} `;
  document.getElementById(
    "countdown-minutos"
  ).textContent = `${tempoRestante.minutos} `;
  document.getElementById(
    "countdown-segundos"
  ).textContent = `${tempoRestante.segundos} `;

  setTimeout(atualizarCountdown, 1000);
}

atualizarCountdown();

let player;
let isPlaying = true;
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
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("audio-placeholder", {
    height: "0",
    width: "0",
    videoId: playlist[currentTrackIndex].id,
    events: {
      onReady: onPlayerReady,
    },
    playerVars: {
      autoplay: 1,
      loop: 1,
    },
  });
}

function onPlayerReady(event) {
  player.setVolume(30); // Define o volume inicial para 30%

  const playPauseBtn = document.getElementById("play-pause-btn");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const previousBtn = document.getElementById("previous-btn");
  const nextBtn = document.getElementById("next-btn");
  const volumeUpBtn = document.getElementById("volume-up-btn");
  const volumeDownBtn = document.getElementById("volume-down-btn");

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
      loadTrack(playlist.length - 1); // Vai para a última música se estiver na primeira
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentTrackIndex < playlist.length - 1) {
      loadTrack(currentTrackIndex + 1);
    } else {
      loadTrack(0); // Vai para a primeira música se estiver na última
    }
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
