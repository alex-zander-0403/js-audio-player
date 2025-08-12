const playListEl = document.getElementById("playlist");
const audioEl = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");

const progressBarEl = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSliderEl = document.getElementById("volume-slider");
const volumeIcons = document.querySelectorAll(".volume img");

//
const tracks = [
  {
    name: "Snooр Dog - Riders On The Storm",
    src: "tracks/Snooр Dog - Riders On The Storm.mp3",
  },
  {
    name: "The Crystal Method - Born Too Slow",
    src: "tracks/The Crystal Method - Born Too Slow.mp3",
  },
  { name: "Hush - Fired Up", src: "tracks/Hush - Fired Up.mp3" },
  { name: "Rock1 - I Am Rock", src: "tracks/Rock1 - I Am Rock.mp3" },
  { name: "Disturbed - Decadence", src: "tracks/Disturbed - Decadence.mp3" },
];

let currentTrackIndex = 0;

//
function setPlayList() {
  playListEl.innerHTML = "";

  tracks.forEach((track, index) => {
    const liEl = document.createElement("li");
    liEl.textContent = `${index + 1}.  ${track.name}`;
    liEl.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
    if (index === currentTrackIndex) {
      liEl.classList.add("active");
    }

    playListEl.append(liEl);
  });
}

// --------------------------------------

//
function loadTrack(index) {
  const track = tracks[index];
  audioEl.src = track.src;
  audioEl.load();

  currentTrackIndex = index;
  setPlayList();
}

// логика play
function playTrack() {
  audioEl.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

// логика pause
function pauseTrack() {
  audioEl.pause();
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// логика stop
function stopTrack() {
  audioEl.pause();
  audioEl.currentTime = 0;
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// след трек
function nextTrack() {
  loadTrack(currentTrackIndex + 1);
  playTrack();
}
// пред трек
function prevTrack() {
  loadTrack(currentTrackIndex - 1);
  playTrack();
}

playBtn.addEventListener("click", () => {
  playTrack();
});
pauseBtn.addEventListener("click", () => {
  pauseTrack();
});
stopBtn.addEventListener("click", () => {
  stopTrack();
});
nextBtn.addEventListener("click", () => {
  nextTrack();
});
prevBtn.addEventListener("click", () => {
  prevTrack();
});

// --------------------------------------

// текущее время, длительность трека и слайдер прогресса
function updateProgressBar() {
  const { currentTime, duration } = audioEl;

  if (isNaN(duration)) return;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);

  const progress = (currentTime / duration) * 100;
  progressBarEl.value = progress;
}

// вспомогательная функция форматирования времени
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  // .toString()
  // .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
audioEl.addEventListener("timeupdate", updateProgressBar);

// логика перемотки
function seekTrack() {
  audioEl.currentTime = (progressBarEl.value / 100) * audioEl.duration;
}

progressBarEl.addEventListener("input", seekTrack);

// --------------------------------------

// function updateVolume(volume) {
//   audioEl.volume = volume;
// }

// volumeSliderEl.addEventListener("input", () => {
//   const volume = volumeSliderEl.value;
//   updateVolume(volume);
// });

// функция изменения звука
function updateVolume() {
  const volume = volumeSliderEl.value;
  seekVolume(volume);
}

// логика установки звука
function seekVolume(volume) {
  audioEl.volume = volume;

  volumeIcons.forEach((icon, index) => {
    if (volume < 0.01) {
      icon.style.display = index === 0 ? "inline" : "none";
    } else {
      const iconIndexToShow = Math.min(Math.floor(volume * 3), 2);
      icon.style.display = index === iconIndexToShow + 1 ? "inline" : "none";
    }
  });
}

volumeSliderEl.addEventListener("input", updateVolume);

// --------------------------------------

// след трек при окончании аудио
audioEl.addEventListener("ended", nextTrack);
// авто загрузка плейлиста
setPlayList();
// установка трека по умолчанию (0) для запуска по playBtn
loadTrack(currentTrackIndex);
// перезапуск громкости для определения иконки громкости
updateVolume(volumeSliderEl.value);
