const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const loginBtn = document.getElementById("loginbtn");
const userLogged = localStorage.getItem("loggedInUser");
if (userLogged) {
  localStorage.removeItem("loggedInUser");
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userInLocalStorage = localStorage.getItem(loginEmail.value);

  if (userInLocalStorage) {
    const user = JSON.parse(userInLocalStorage);
    if (user.password === loginPassword.value) {
      window.location.href = "./home.html";
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      alert("Wrong password");
    }
  }
});
