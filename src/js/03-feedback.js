import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = "feedback-form-state";

const saveFormState = throttle(() => {
    const formState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }, 500);

  const loadFormState = () => {
    const savedFormState = localStorage.getItem(STORAGE_KEY);
    if (savedFormState) {
      const formState = JSON.parse(savedFormState);
      emailInput.value = formState.email;
      messageInput.value = formState.message;
    }
  };
  
  form.addEventListener('input', () => {
    saveFormState();
  });
  
  window.addEventListener('load', () => {
    loadFormState();
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    emailInput.value = '';
    messageInput.value = '';
    console.log("Form submitted with the following data:");
    console.log("Email:", emailInput.value);
    console.log("Message:", messageInput.value);
  });

  
  
  
  
  
  
  

