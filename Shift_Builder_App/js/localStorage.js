const registerBtn = document.querySelector("#btn");
const userName = document.getElementById("username");
const mail = document.getElementById("mail");
const fullName = document.getElementById("fullname");
const age = document.getElementById("age");
const password = document.getElementById("password");
const password2 = document.getElementById("repeatpassword");

const registredUsers = [];
//GET data from local storage
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    registredUsers.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  console.log("DATA FROM LOCALSTORAGE:", registredUsers);
});

//validate input fields
function validateInputs() {
  const userNameValue = userName.value;
  const mailValue = mail.value;
  const fullNameValue = fullName.value;
  const ageValue = age.value;
  const passwordValue = password.value;
  const password2Value = password2.value;

  if (userNameValue === "") {
    setError(userName, "User name is required");
  } else if (!isValidName(userNameValue)) {
    setError(userName, "Insert a name between 3 and 15 letters");
  } else {
    setSuccess(userName);
  }

  if (mailValue === "") {
    setError(mail, "Email is required");
  } else if (!isValidEmail(mailValue)) {
    setError(mail, "Enter a valid email");
  } else {
    setSuccess(mail);
  }

  if (fullNameValue === "") {
    setError(fullName, "Full Name is required");
  } else if (!isValidName(fullNameValue)) {
    setError(fullName, "Insert a name between 3 and 15 letters");
  } else {
    setSuccess(fullName);
  }

  if (ageValue === "") {
    setError(age, "Age is required");
  } else if (!isValidAge(ageValue)) {
    setError(age, "Age must be a number");
  } else if (ageValue < 18 || ageValue > 65) {
    setError(age, "Age must be between 18 and 65");
  } else {
    setSuccess(age);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (!isValidPassword(passwordValue)) {
    setError(password, "Enter a pass with a capital letter and >6 ");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Password is required");
  } else if (!isValidPassword(password2Value)) {
    setError(password2, "Enter a pass with a capital letter and >6 ");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }
}

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateInputs();
  if (
    userName.parentElement.classList.contains("form__group--success") &&
    mail.parentElement.classList.contains("form__group--success") &&
    fullName.parentElement.classList.contains("form__group--success") &&
    age.parentElement.classList.contains("form__group--success") &&
    password.parentElement.classList.contains("form__group--success") &&
    password2.parentElement.classList.contains("form__group--success")
  ) {
    const formMess = document.querySelector(".form__message");
    formMess.innerText = "You have successfully registered";
    formMess.classList.add("form__message--active");
    addUser();

    window.location = "./login.html"; //must be changed to home page
  }
});

//Validate email
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

//Validate name
const isValidName = (username) => {
  const re = /^([A-Za-zéàë]{3,15} ?)+$/;
  return re.test(String(username));
};

//Validate password
const isValidPassword = (pass) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
  return re.test(String(pass));
};

//Validate age
const isValidAge = (age) => {
  const re = /^\d+$/;
  return re.test(String(age));
};

//SET ERROR
const setError = (element, message) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".form__group-message");

  errorDisplay.innerText = message;
  formGroup.classList.add("form__group--error");
  formGroup.classList.remove("form__group--success");
};
//SET SUCCESS
const setSuccess = (element) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".form__group-message");

  errorDisplay.innerText = "";
  formGroup.classList.remove("form__group--error");
  formGroup.classList.add("form__group--success");
};

//POST data to localstorage
const addUser = () => {
  //GET input values and store them in an object
  let user = {
    userName: document.querySelector("#username").value,
    email: document.querySelector("#mail").value,
    fullName: document.querySelector("#fullname").value,
    age: document.querySelector("#age").value,
    password: document.querySelector("#password").value,
    shifts: {},
  };

  //save user to local storage
  localStorage.setItem(user.email, JSON.stringify(user));
};
