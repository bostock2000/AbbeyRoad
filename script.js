window.addEventListener(
    "keydown",
    function(event){
        if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1){
            event.preventDefault();
        }
    },
    false
);

let songArray = [
    "audio/The Beatles - Come Together.mp3",
    "audio/The Beatles - Something.mp3",
    "audio/The Beatles - Maxwell's Silver Hammer.mp3",
    "audio/The Beatles - Oh! Darling.mp3",
    "audio/The Beatles - Octopus's Garden.mp3",
    "audio/The Beatles - I Want You (She's So Heavy).mp3",
    "audio/The Beatles - Here Comes the Sun.mp3",
    "audio/The Beatles - Because.mp3",
    "audio/The Beatles - You Never Give Me Your Money.mp3",
    "audio/The Beatles - Sun King.mp3",
    "audio/The Beatles - Mean Mr. Mustard.mp3",
    "audio/The Beatles - Polythene Pam.mp3",
    "audio/The Beatles - She Came In Through the Bathroom Window.mp3",
    "audio/The Beatles - Golden Slumbers.mp3",
    "audio/The Beatles - Carry That Weight.mp3",
    "audio/The Beatles - The End.mp3",
    "audio/The Beatles - Her Majesty.mp3"
];

let currentSong = 0;
let song = new Audio();
window.onload = function(){
    playSong();
};

function playSong() {
    song.src = songArray[currentSong];
    document.getElementById("title").textContent = songArray[currentSong].slice(20, -4);
}

function playOrPause() {
    if (song.paused) {
        song.play();
        document.getElementById("play").src = "images/pause.png";
    } else {
        song.pause();
        document.getElementById("play").src = "images/play.png";
    }
}

song.addEventListener("timeupdate", function() {
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent = min + ":" + sec;
    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= songArray.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songArray.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 39) {
        next();
    } else if (event.keyCode === 37) {
        prev();;
    } else if (
        event.keyCode === 32
    ) {
        playOrPause();
    }
});

document.getElementById("volumeSlider").addEventListener("mousemove", setvolume);

function setvolume() {
    song.volume = document.getElementById("volumeSlider").value / 100;
}


