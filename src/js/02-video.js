import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function setSavedTime() {
  const timeObj = load('videoplayer-current-time');
  player.setCurrentTime(timeObj.seconds);
}

player.on(
  'timeupdate',
  throttle(time => save('videoplayer-current-time', time), 1000)
);

document.addEventListener('DOMContentLoaded', setSavedTime);
