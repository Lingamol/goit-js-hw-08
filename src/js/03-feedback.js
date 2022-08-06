import throttle from 'lodash.throttle';
import { save, load } from './storage';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('form.feedback-form'),
  formText: document.querySelector('textarea[name="message"]'),
  inputEmail: document.querySelector('input[type="email"]'),
};

refs.form.addEventListener('input', throttle(onInputForm, 500));

refs.form.addEventListener('submit', onSubmitForm);

loadFormData();

function onInputForm(event) {
  formData[event.target.name] = event.target.value;
  save(LOCALSTORAGE_KEY, formData);
}

function onSubmitForm(event) {
  event.preventDefault();
  event.currentTarget.reset();
  // refs.formText.textContent = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
}
function loadFormData() {
  const localFormData = load(LOCALSTORAGE_KEY);
  if (localFormData) {
    refs.formText.textContent = localFormData.message || '';
    refs.inputEmail.value = localFormData.email || '';
    console.log('load', localFormData);
  }
}
