let myLibrary = [];
const container = document.querySelector(".container");
const bookContainer = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const submitFormBtn = document.querySelector(".to-list-btn");
const modal = document.querySelector("dialog");

// Book constructor
// function Book(title, author, pages, isRead = "No") {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
//   this.id = crypto.randomUUID();
//   this.change = function () {
//     this.isRead = this.isRead === "Yes!" ? "No" : "Yes!";
//   };
// }

class Book {
  constructor(title, author, pages, isRead = "No") {
    ((this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.isRead = isRead),
      (this.id = crypto.randomUUID()));
  }

  change() {
    this.isRead = this.isRead === "Yes!" ? "No" : "Yes!";
  }
}

function displayTable() {
  const table = document.createElement("table");
  const row = document.createElement("tr");
  const thTitle = document.createElement("th");
  const thAuthor = document.createElement("th");
  const thPages = document.createElement("th");
  const thIsRead = document.createElement("th");
  const thActions = document.createElement("th");

  thTitle.textContent = "Title";
  thAuthor.textContent = "Author";
  thPages.textContent = "Pages";
  thIsRead.textContent = "Completed?";
  thActions.textContent = "Actions";

  table.appendChild(row);
  row.append(thTitle, thAuthor, thPages, thIsRead, thActions);

  table.classList.add("table");
  bookContainer.appendChild(table);
}

function addBookToLibrary(title, author, pages, isRead) {
  if (title === "" || author === "" || pages === "") return;
  myLibrary.push(new Book(title, author, pages, isRead));
}

function deleteTable() {
  const currentTable = document.querySelector(".table");
  currentTable.remove();
}

function displayBooks() {
  deleteTable();
  displayTable();
  const newTable = document.querySelector(".table");

  myLibrary.forEach((book) => {
    const rowD = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdIsRead = document.createElement("td");
    const tdActions = document.createElement("td");
    const tdActionsDelete = document.createElement("button");
    const tdActionsChange = document.createElement("button");
    tdActions.append(tdActionsChange, tdActionsDelete);

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdIsRead.textContent = book.isRead;
    tdActionsChange.textContent = "Change Status";
    tdActionsDelete.textContent = "Delete";
    tdActionsChange.classList.add("change");
    tdActionsDelete.classList.add("delete");

    rowD.classList.add("row");
    rowD.dataset.id = book.id;

    rowD.append(tdTitle, tdAuthor, tdPages, tdIsRead, tdActions);
    newTable.appendChild(rowD);
  });
}

function deleteRow() {
  let deleteBtns = [...document.querySelectorAll(".delete")];

  deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", (e) => {
      const targetRow = e.target.closest(".row");
      const idToDelete = targetRow.dataset.id;

      targetRow.remove();
      myLibrary = myLibrary.filter((book) => book.id !== idToDelete);
    });
  });
}

function changeStatus() {
  let changeBtns = [...document.querySelectorAll(".change")];

  changeBtns.forEach((changeBtn, index) => {
    changeBtn.addEventListener("click", (e) => {
      const targetRow = e.target.closest(".row");
      const idToChange = targetRow.dataset.id;
      let toggle = changeBtn.parentElement.previousElementSibling;
      myLibrary.forEach((book) => {
        if (book.id === idToChange) {
          book.change();
          toggle.textContent = book.isRead;
        }
      });
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputArr = [...document.querySelectorAll("input[type='text']")];

  const formData = new FormData(form);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const completed = formData.get("completed");

  //add to array
  addBookToLibrary(title, author, pages, completed);
  //display to ui
  displayBooks();
  //clear input
  inputArr.forEach((input) => (input.value = ""));
  //delete button
  deleteRow();
  //change status button
  changeStatus();
});

addBookToLibrary("Making Sense of God", "Timothy Keller", 500, "Yes!");
addBookToLibrary("Reading the Bible for a Change", "Ray Lubeck", 300, "No");

displayTable();
displayBooks();
deleteRow();
changeStatus();
