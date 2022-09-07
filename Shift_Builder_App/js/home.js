//Display the user name on DOM
const userNamePlaceHolder = document.querySelector("#username");
const loggedInUser = localStorage.getItem("loggedInUser");

const checkLoggedInUser = () => {
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    userNamePlaceHolder.innerText = user.userName;
    return user;
  } else {
    window.location = "./login.html";
  }
};

const userLogged = checkLoggedInUser(); //Data of the user Logged
const userShifts = userLogged.shifts; //Shifts objects already stored as a Map
const shiftsKey = []; //Array of the shifts name

for (const prop in userShifts) {
  shiftsKey.push(prop);
}

//Get the information from the user
const shiftForm = document.getElementById("form");
const shiftName = document.getElementById("shiftName");
const shiftStart = document.getElementById("start");
const shiftEnd = document.getElementById("end");
const wage = document.getElementById("wage");
const comm = document.getElementById("comments");
const btn = document.getElementById("addShift");

//Form submition
shiftForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const shiftStartDate = new Date(shiftStart.value).getTime();
  const shiftEndDate = new Date(shiftEnd.value).getTime();

  if (shiftsKey.includes(shiftName.value)) {
    errorBox.style.display = "block";
    errorMess.textContent =
      "The name must be unique.\n Please insert a new name ";
  } else if (shiftStartDate > shiftEndDate) {
    errorBox.style.display = "block";
    errorMess.textContent = "End shift can be earlier than start shift";
  } else {
    createShift();
    loading();
  }
});

//Loading data
function loading() {
  //Loading circle
  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    modal.style.display = "none";
  }, 3000);
}

//Calculate the worked hours
const interval =
  new Date(shiftEnd.value).getTime() - new Date(shiftStart.value).getTime();
const hours = interval / 1000 / 60 / 60;

//Create shift
const createShift = () => {
  const shift = {
    shiftName: shiftName.value,
    start: new Date(shiftStart.value).getTime(),
    end: new Date(shiftEnd.value).getTime(),
    interval:
      new Date(shiftEnd.value).getTime() - new Date(shiftStart.value).getTime(),

    wage: parseInt(wage.value),
    earning:
      parseInt(wage.value) *
      ((new Date(shiftEnd.value).getTime() -
        new Date(shiftStart.value).getTime()) /
        1000 /
        60 /
        60),
    comm: comm.value,
  };
  userShifts[shiftName.value] = shift;

  localStorage.setItem("loggedInUser", JSON.stringify(userLogged)); //Store to the active state(logged user)
  localStorage.setItem(userLogged.email, JSON.stringify(userLogged)); //Update the account
};

//Modal control
const modal = document.getElementById("modal");
const addShiftBtn = document.getElementById("addShift");
const closeModal = document.getElementById("close");

addShiftBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

//Error box
const errorBox = document.getElementById("error");
const errorMess = document.querySelector(".error-box__message");
const errorButton = document.querySelector(".error-box__btn");
errorButton.addEventListener("click", () => {
  errorBox.style.display = "none";
  errorMess.textContent = "";
});

//Log out
const logOut = document.getElementById("logout");
logOut.addEventListener("click", () => {
  localStorage.setItem(userLogged.email, JSON.stringify(userLogged));
  localStorage.removeItem("loggedInUser");
  window.location = "./index.html";
});
