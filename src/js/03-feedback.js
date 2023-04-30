import throttle from 'lodash.throttle';
import { save, load } from '/src/storage.js';

const form = document.querySelector('.feedback-form');

const handleInput = () => {
  const email = form.email.value;
  const message = form.message.value;
  save('feedback-form-state', { email, message });
};

const fillForm = () => {
  const formData = load('feedback-form-state');

  if (formData) {
    form.email.value = formData.email;
    form.message.value = formData.message;
  }
};

const handleSubmit = event => {
  event.preventDefault();

  const email = form.email.value;
  const message = form.message.value;

  localStorage.removeItem('feedback-form-state');

  form.email.value = '';
  form.message.value = '';

  console.log({ email, message });
};

form.addEventListener('input', throttle(handleInput, 500));
window.addEventListener('DOMContentLoaded', fillForm);
form.addEventListener('submit', handleSubmit);
