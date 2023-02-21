import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function initForm() {
  let saveText = localStorage.getItem(LOCALSTORAGE_KEY);
  try {
    if (saveText) {
      saveText = JSON.parse(saveText);
      Object.entries(saveText).forEach(([name, value]) => {
        formEl.elements[name].value = value;
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
