import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    const playerBtn = document.querySelectorAll('.player-btn'),
          playerBlock = document.querySelectorAll('.player-block'),
          temp = document.querySelector('.temp');

        const deactivationPlayer = () => {
            temp.style.display = 'none';
            playerBlock.forEach( item => item.classList.remove('active'));
            playerBtn.forEach( item => item.classList.remove('active'));
        };
    
        playerBtn.forEach((btn, i) => {
            
            btn.addEventListener('click', () => {
                deactivationPlayer();
                btn.classList.add('active');
                playerBlock[i].classList.add('active');
            });
        });
});

videoPlayerInit();



