import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './storage';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  save('videoplayer-current-time', data);
}

player
  .setCurrentTime(
    load('videoplayer-current-time')
      ? load('videoplayer-current-time').seconds
      : 0
  )
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
