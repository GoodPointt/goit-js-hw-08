import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(time => setToStorage(time), 1000)
);

function setToStorage(t) {
  localStorage.setItem('playback-time', JSON.stringify(t));
}
