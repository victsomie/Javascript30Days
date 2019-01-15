/* Get our elements */

const player = document.querySelector('.player');
const video =  player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

/* Build our functions */
function togglePlay(){
    /*
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
    */
    
    // Simplify the above if statement using TERNERY
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// Updating the play buttons pause/play
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    // console.log('Update the play button..');
}

// Skip functionality
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update the range
function handleRangeUpdate(){
     console.log(this.name);
    video[this.name] = this.value;

}

// Handle progress
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`;
}

// Scrubbing
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e);
}

// Making video fullscreen
function makeFullscreen(){
    video.requestFullscreen();
    //console.log(video);
    console.log('Fullscreen');
}


/* Hook up the event listeners */
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));

let mousedown = false; // Flag to change the event with mouse

progress.addEventListener('click', scrub);
/*progress.addEventListener('mousemove', (e) => {
    if(mousedown){
        scrub(e);
    }
});
*/
/* simplify above function */

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Making a full screen
fullScreen.addEventListener('click', makeFullscreen);
