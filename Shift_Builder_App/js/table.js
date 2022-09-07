const tbody = document.querySelector("tbody");
const searchByNameInput = document.querySelector("#search__name");
const searchByStartDateInput = document.querySelector("#search__date--start");
const searchByEndDateInput = document.querySelector("#search__date--end");
const spanStartDate = document.querySelector("#start-period");
const spanEndDate = document.querySelector("#end-period");
const total = document.querySelector("#total");

//Get the user object from local storage
const user = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(user);

//Store the shifts objects in an array
const shiftArr = [];
for (let prop in user.shifts) {
  shiftArr.push(user.shifts[prop]);
}
console.log(shiftArr);

//Transform time from millisec to date
const timeFormat = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  createTable();
});
searchByNameInput.addEventListener("keyup", searchByName);
searchByStartDateInput.addEventListener("input", searchByStartDate);
searchByEndDateInput.addEventListener("input", searchByEndDate);

//Search by End Date
function searchByEndDate() {
  tbody.innerHTML = "";
  const valueEnd = new Date(searchByEndDateInput.value).getTime();
  const valueStart = new Date(searchByStartDateInput.value).getTime();
  let totalEarning = 0;

  for (let i = 0; i < shiftArr.length; i++) {
    let endDate = shiftArr[i].end;
    let startDate = shiftArr[i].start;
    if (endDate <= valueEnd && valueStart <= startDate) {
      totalEarning += shiftArr[i].earning;
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML = ` <td>${shiftArr[i].shiftName} </td>
         <td>${timeFormat(shiftArr[i].start)}</td>
         <td>${timeFormat(shiftArr[i].end)} </td>
         <td>${parseFloat(shiftArr[i].interval / 1000 / 60 / 60).toFixed(
           2
         )}</td>
         <td>£ ${shiftArr[i].wage}</td>
         <td>£ ${parseFloat(shiftArr[i].earning).toFixed(2)}</td>
         <td>${shiftArr[i].comm}</td>`;

      spanStartDate.innerText = `${searchByStartDateInput.value}`;
      spanEndDate.innerText = `${searchByEndDateInput.value}`;
      total.innerText = `${totalEarning}`;
    }
  }
}

//Search by Start Date

function searchByStartDate() {
  tbody.innerHTML = "";
  const value = new Date(searchByStartDateInput.value).getTime();
  let totalEarning = 0;

  for (let i = 0; i < shiftArr.length; i++) {
    let startDate = shiftArr[i].start;
    if (startDate >= value) {
      totalEarning += shiftArr[i].earning;
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML = ` <td>${shiftArr[i].shiftName} </td>
         <td>${timeFormat(shiftArr[i].start)}</td>
         <td>${timeFormat(shiftArr[i].end)} </td>
         <td>${parseFloat(shiftArr[i].interval / 1000 / 60 / 60).toFixed(
           2
         )}</td>
         <td>£ ${shiftArr[i].wage}</td>
         <td>£ ${parseFloat(shiftArr[i].earning).toFixed(2)}</td>
         <td>${shiftArr[i].comm}</td>`;
      spanStartDate.innerText = `${searchByStartDateInput.value}`;
      spanEndDate.innerText = `Present`;
      total.innerText = `${totalEarning}`;
    }
  }
}

//Search By Name
function searchByName() {
  tbody.innerHTML = "";
  const searchQuerry = searchByNameInput.value.toLowerCase();
  for (let i = 0; i < shiftArr.length; i++) {
    let name = shiftArr[i].shiftName.toLowerCase().replace(" ", "");
    if (name.search(searchQuerry) !== -1) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML = ` <td>${shiftArr[i].shiftName} </td>
         <td>${timeFormat(shiftArr[i].start)}</td>
         <td>${timeFormat(shiftArr[i].end)} </td>
         <td>${parseFloat(shiftArr[i].interval / 1000 / 60 / 60).toFixed(
           2
         )}</td>
         <td>£ ${shiftArr[i].wage}</td>
         <td>£ ${parseFloat(shiftArr[i].earning).toFixed(2)}</td>
         <td>${shiftArr[i].comm}</td>`;
    }
  }
}

//Create table
function createTable() {
  let totalEarning = 0;

  for (let i = 0; i < shiftArr.length; i++) {
    totalEarning += shiftArr[i].earning;
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    tr.innerHTML = ` <td>${shiftArr[i].shiftName} </td>
         <td>${timeFormat(shiftArr[i].start)}</td>
         <td>${timeFormat(shiftArr[i].end)} </td>
         <td>${parseFloat(shiftArr[i].interval / 1000 / 60 / 60).toFixed(
           2
         )}</td>
         <td>£ ${shiftArr[i].wage}</td>
         <td>£ ${parseFloat(shiftArr[i].earning).toFixed(2)}</td>
         <td>${shiftArr[i].comm}</td>`;

    total.innerText = `${totalEarning}`;
  }
}

//Search (general method to search) by DOM manipulation
/*document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".search-input").forEach((inputField) => {
    const tableRows = inputField
      .closest("table")
      .querySelectorAll("tbody > tr");
    const headerCell = inputField.closest("th");
    const otherHeaderCells = headerCell.closest("tr").children;
    const columnIndex = Array.from(otherHeaderCells).indexOf(headerCell);
    const searchableCells = Array.from(tableRows).map(
      (row) => row.querySelectorAll("td")[columnIndex]
    );

    inputField.addEventListener("input", () => {
      const searchQuery = inputField.value.toLowerCase();

      for (const tableCell of searchableCells) {
        const row = tableCell.closest("tr");
        const value = tableCell.textContent.toLowerCase().replace(",", "");
        row.style.visibility = null;

        if (value.search(searchQuery) === -1) {
          row.style.visibility = "collapse";
        }
      }
    });
  });
});*/
