import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = "videoplayer-current-time";

const onTimeUpdate = throttle(function(data) {
  player.getCurrentTime().then(seconds => {
    localStorage.setItem(STORAGE_KEY, seconds);
    console.log("Поточний час:", seconds);
  }).catch(error => {
    // error
  });
}, 1000);

player.on('timeupdate', onTimeUpdate);

window.addEventListener('beforeunload', function() {
  player.getCurrentTime().then(seconds => {
    localStorage.setItem(STORAGE_KEY, seconds);
  }).catch(error => {
    // error
  });
});

const currentTime = localStorage.getItem(STORAGE_KEY);
if (currentTime) {
  player.setCurrentTime(parseFloat(currentTime)).then(seconds => {
    // seconds
  }).catch(error => {
    switch (error.name) {
      case 'RangeError':
        // time 0 or >
        break;

      default:
        // error
        break;
    }
  });
}
