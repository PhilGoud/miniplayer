const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress-container");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");
const volumeControl = document.getElementById("volume");

// Lecture/Pause
playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "❚❚";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶";
  }
});

// Mise à jour de la barre de progression et du temps
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  timeCurrent.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")}`;

  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);
  timeTotal.textContent = `${totalMinutes}:${totalSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Contrôle du volume
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Avance rapide via la barre de progression
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const progressWidth = rect.width;
  const newTime = (offsetX / progressWidth) * audio.duration;
  audio.currentTime = newTime;
});
