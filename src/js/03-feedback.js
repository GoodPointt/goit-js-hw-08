import throttle from 'lodash.throttle';
// import { save, load } from './02-video';
const form = document.querySelector('.feedback-form');
// let emailValue = form.email.value;
// let msgValue = form.message.value;

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

const handleInput = () => {
  const email = form.email.value;
  const message = form.message.value;
  save('feedback-form-state', { email, message });
  // save('feedback-form-state', { emailValue, msgValue });
};

const fillForm = () => {
  const formData = load('feedback-form-state');

  if (formData) {
    form.email.value = formData.email;
    form.message.value = formData.message;

    // emailValue = formData.email;
    // msgValue = formData.message;
  }
};

const handleSubmit = event => {
  event.preventDefault();

  const email = form.email.value;
  const message = form.message.value;

  localStorage.removeItem('feedback-form-state');

  form.email.value = '';
  form.message.value = '';
  // emailValue = '';
  // msgValue = '';

  console.log({ email, message });
};

form.addEventListener('input', throttle(handleInput, 500));
window.addEventListener('DOMContentLoaded', fillForm);
form.addEventListener('submit', handleSubmit);
