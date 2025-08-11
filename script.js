const audioEl = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");

const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeSlider = document.getElementById("volume-slider");
const volumeIcons = document.querySelectorAll(".volume img");
const playListEl = document.getElementById("playlist");

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

// --------------------------------------

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

// установка трека по умолчанию (0) для запуска по playBtn
loadTrack(currentTrackIndex);
// авто загрузка плейлиста
setPlayList();
