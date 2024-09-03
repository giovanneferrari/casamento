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
