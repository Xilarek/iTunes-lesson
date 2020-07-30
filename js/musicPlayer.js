import { addZero } from './supscript.js';
export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
          audioImg = document.querySelector('.audio-img'),
          audioHeader = document.querySelector('.audio-header'),
          audioPlayer = document.querySelector('.audio-player'),
          audioNavigation = document.querySelector('.audio-navigation'),
          audioButtonPlay = document.querySelector('.audio-button__play'),
          audioProgress = document.querySelector('.audio-progress'),
          audioProgressTiming = document.querySelector('.audio-progress__timing'),
          audioTimePassed = document.querySelector('.audio-time__passed'),
          audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const nextTrack = () => {
        if (trackIndex === playList.length -1 ) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length -1;
        }
    };

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toLocaleUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playList[trackIndex];
            audioHeader.textContent = track.toLocaleUpperCase();
            loadTrack();

        }

        if (target.classList.contains('audio-button__prev')){
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', ()=> {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', ()=> {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = ( x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audioButtonPlay.classList.remove('fa-play');
            audioButtonPlay.classList.add('fa-pause');
            audio.classList.remove('play');
        }
    }
};