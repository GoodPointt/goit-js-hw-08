import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './storage.js';

const TIMECODE_STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function setSavedTime() {
  const timeObj = load(TIMECODE_STORAGE_KEY);
  if (timeObj) player.setCurrentTime(timeObj.seconds);
}

player.on(
  'timeupdate',
  throttle(time => save(TIMECODE_STORAGE_KEY, time), 1000)
);

document.addEventListener('DOMContentLoaded', setSavedTime);
