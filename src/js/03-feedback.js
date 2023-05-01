import throttle from 'lodash.throttle';
import { save, load } from './storage.js';

const form = document.querySelector('.feedback-form');
const FORM_STORAGE_KEY = 'feedback-form-state';
let formData = {};

const handleInput = e => {
  formData[e.target.name] = e.target.value.trim();
  save(FORM_STORAGE_KEY, formData);
};

const fillForm = () => {
  const newFormData = load(FORM_STORAGE_KEY);

  if (!newFormData) return;
  formData = newFormData;
  Object.entries(formData).forEach(([key, value]) => {
    form.elements[key].value = value;
  });
};

const handleSubmit = event => {
  event.preventDefault();
  console.log(formData);

  localStorage.removeItem(FORM_STORAGE_KEY);
  formData = {};
  form.reset();
};

form.addEventListener('input', throttle(handleInput, 500));
window.addEventListener('DOMContentLoaded', fillForm);
form.addEventListener('submit', handleSubmit);
