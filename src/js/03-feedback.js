import throttle from 'lodash.throttle';
import { save, load } from './storage';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('form.feedback-form'),
  formText: document.querySelector('textarea[name="message"]'),
  inputEmail: document.querySelector('input[type="email"]'),
};
refs.form.addEventListener('submit', onSubmitForm);

refs.form.addEventListener('input', throttle(onInputForm, 500));

loadFormData();

function onInputForm(event) {
  const localFormData = load(LOCALSTORAGE_KEY);
  formData[event.target.name] = event.target.value;
  if (localFormData) {
    const changedFormData = { ...localFormData, ...formData };
    save(LOCALSTORAGE_KEY, changedFormData);
  } else {
    save(LOCALSTORAGE_KEY, formData);
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
function loadFormData() {
  const localFormData = load(LOCALSTORAGE_KEY);
  if (localFormData) {
    refs.formText.value = localFormData.message || '';
    refs.inputEmail.value = localFormData.email || '';
  }
}
