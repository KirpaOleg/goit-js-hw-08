import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  console.log('formData:', formData);
  return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function initForm() {
  const saveText = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY, JSON.stringify(formData))
  );

  if (saveText) {
    formEl.email.value = saveText.email;
    formEl.message.value = saveText.message;
  }
}
