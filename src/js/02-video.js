import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from '/src/storage.js';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function setSavedTime() {
  const timeObj = load('videoplayer-current-time');
  if (timeObj) player.setCurrentTime(timeObj.seconds);
}

player.on(
  'timeupdate',
  throttle(time => save('videoplayer-current-time', time), 1000)
);

document.addEventListener('DOMContentLoaded', setSavedTime);
