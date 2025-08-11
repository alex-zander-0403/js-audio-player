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
  { name: "Return To Innocence / Enigma", src: "tracks/track1.mp3" },
  {
    name: "Living On My Own / Queen, Freddie Mercury",
    src: "tracks/track2.mp3",
  },
  {
    name: " Nothing Else Matter / Metallica",
    src: "tracks/track3.mp3",
  },
  {
    name: "The Sound Of Silence / Simon & Garfunkel; ",
    src: "tracks/track4.mp3",
  },
  { name: "A Neverending Dream / X-Perience", src: "tracks/track5.mp3" },
  { name: "Return To Innocence / Enigma", src: "tracks/track1.mp3" },
  {
    name: "Living On My Own / Queen, Freddie Mercury",
    src: "tracks/track2.mp3",
  },
  {
    name: " Nothing Else Matter / Metallica",
    src: "tracks/track3.mp3",
  },
  {
    name: "The Sound Of Silence / Simon & Garfunkel; ",
    src: "tracks/track4.mp3",
  },
  { name: "A Neverending Dream / X-Perience", src: "tracks/track5.mp3" },
];

//
function setPlayList() {
  tracks.forEach((track, index) => {
    const liEl = document.createElement("li");
    liEl.textContent = `${index + 1}.  ${track.name}`;
    liEl.addEventListener("click", () => {
      // play fn
    });

    playListEl.append(liEl);
  });
}

// авто включение плейлиста
setPlayList();
