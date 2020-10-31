const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const previousBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songList = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'prithibita-naki',
        displayName: 'Prithibita Naki',
        artist: 'Mohiner Ghoraguli',
    }
]

let isPlaying = false;

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause();
}

// Play or Pause Audio
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

// Update DOM

function loadMusic(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let currentSongIndex = 0;

function playPrevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length - 1;
    }
    loadMusic(songList[currentSongIndex]);
    playMusic();

}

function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex > songList.length - 1) {
        currentSongIndex = 0;
    }
    loadMusic(songList[currentSongIndex]);
    playMusic();

}
// On Load
loadMusic(songList[currentSongIndex]);

function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement; // Destructuring
        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        // Caculate Display for Duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching Duration Element to Avoid NaN
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //Calculating Display for Current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

previousBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);
music.addEventListener('ended', playNextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);