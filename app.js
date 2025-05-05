class Song {
  constructor(title, artist, duration, audioSrc) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.audioSrc = audioSrc;
  }
  getSongInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Artist: ${this.artist}`);
    console.log(`Duration: ${this.duration}`);
    console.log(`Audio Source: ${this.audioSrc}`);
  }
}

class Playlist {
  constructor() {
    this.songs = [];
  }
  addSongs(songs) {
    this.songs.push(...songs);
    console.log("new songs has been added");
  }
  listSongs() {
    this.songs.forEach(function (song, index) {
      console.log(
        `${index + 1}) ${song.title} - ${song.artist} - ${song.duration} - ${
          song.audioSrc
        }`
      );
    });
  }
}

class Musicplayer {
  constructor() {
    this.audio = new Audio();
    this.playlist = new Playlist();
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.audio.addEventListener("timeupdate", () => {
      let progressBar = document.getElementById("progress-bar");
      let currentTime = document.getElementById("current-time");
      let totalDuration = document.getElementById("total-duration");

      // Set progress
      progressBar.value = (this.audio.currentTime / this.audio.duration) * 100;

      // Format time
      function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60)
          .toString()
          .padStart(2, "0");
        return `${minutes}:${seconds}`;
      }

      currentTime.textContent = formatTime(this.audio.currentTime);
      totalDuration.textContent = formatTime(this.audio.duration || 0);
    });
  }
  play() {
    if (this.playlist.songs.length === 0) return;
    let currentSong = this.playlist.songs[this.currentSongIndex];
    this.audio.src = currentSong.audioSrc;
    this.audio.play();
    this.isPlaying = true;
    document.getElementById("song-title").textContent = currentSong.title;
    document.getElementById("artist-name").textContent = currentSong.artist;
    console.log("song is playing");
  }
  pause() {
    if (!this.isPlaying) return;
    this.audio.pause();
    this.isPlaying = false;
    // document.getElementById("play-pause-btn").innerText = "Play";
    console.log("song is paused");
  }
  nextSong() {
    this.currentSongIndex++;
    if (this.currentSongIndex >= this.playlist.songs.length) {
      this.currentSongIndex = 0;
    }
    let nextSong = this.playlist.songs[this.currentSongIndex];
    this.audio.src = nextSong.audioSrc;
    document.getElementById("song-title").textContent = nextSong.title;
    document.getElementById("artist-name").textContent = nextSong.artist;
    if (this.isPlaying) {
      this.audio.play();
    }
    console.log("next song is playing");
  }
  previousSong() {
    this.currentSongIndex--;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.playlist.songs.length - 1;
    }
    let prevSong = this.playlist.songs[this.currentSongIndex];
    this.audio.src = prevSong.audioSrc;
    document.getElementById("song-title").textContent = prevSong.title;
    document.getElementById("artist-name").textContent = prevSong.artist;
    if (this.isPlaying) {
      this.audio.play();
    }
    console.log("Previous song is playing");
  }
}

let song1 = new Song("Run it Up", "Hanumankind", 2.54, "assets/Run it Up.mp3");
let song2 = new Song("Big Dawgs", "Hanumankind", 3.1, "assets/Big Dawgs.mp3");
let song3 = new Song(
  "Pushpa Pushpa",
  "Devi Sri Prasad",
  4.16,
  "assets/Pushpa Pushpa.mp3"
);
let song4 = new Song(
  "Millionaire",
  "Yo Yo Honey Singh",
  3.19,
  "assets/Millionaire.mp3"
);
let player = new Musicplayer();
player.playlist.addSongs([song1, song2, song3, song4]);
// player.playlist.listSongs();
// player.play();
// setTimeout(player.pause(), 1000);
// player.nextSong();

function togglePlayPause() {
  if (player.isPlaying) {
    player.pause();
  } else {
    player.play();
  }
}
function nextSong() {
  player.nextSong();
}
function previousSong() {
  player.previousSong();
}
document.getElementById("progress-bar").addEventListener("input", (e) => {
  player.audio.currentTime = (e.target.value / 100) * player.audio.duration;
});

document.getElementById("volume-control").addEventListener("input", (e) => {
  player.audio.volume = e.target.value;
});
