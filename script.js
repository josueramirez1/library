let myLibrary = [];
const container = document.querySelector(".container");
const bookContainer = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const submitFormBtn = document.querySelector(".to-list-btn");
const modal = document.querySelector("dialog");

// Book constructor
function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead === "yes" ? "Yes!" : "No";
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}.`;
  };
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
  if (arguments.length === 0) return;
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

    rowD.append(tdTitle, tdAuthor, tdPages, tdIsRead, tdActions);
    newTable.appendChild(rowD);
  });
}

function deleteRow() {
  const deleteBtns = [...document.querySelectorAll(".delete")];

  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", (e) => {
      const targetRow = e.target.closest(".row");
      myLibrary.forEach((book, i) => {
        if (i === index) {
          myLibrary.splice(i, 1);
        }
      });
      targetRow.remove();
    });
  });
}

function changeStatus() {
  const changeBtns = [...document.querySelectorAll(".change")];

  changeBtns.forEach((changeBtn, index) => {
    changeBtn.addEventListener("click", (e) => {
      let previousSibling = changeBtn.closest("td").previousElementSibling;
      console.log(previousSibling.textContent);
      myLibrary.forEach((book, i) => {
        if (i === index) {
          previousSibling.textContent =
            previousSibling.textContent === "Yes!" ? "No" : "Yes!";
          book.isRead = book.isRead === "Yes!" ? "No" : "Yes!";
        }
      });
    });
  });
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".container")) {
    form.classList.remove("active");
    container.style.backgroundColor = "hsl(177, 70%, 41%)";
  }
});

addBtn.addEventListener("click", (e) => modal.showModal());
closeBtn.addEventListener("click", () => modal.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputArr = [...document.querySelectorAll("input[type='text']")];

  console.log(inputArr);

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = parseInt(formData.get("pages"));
  const completed = formData.get("completed");

  //add to array
  addBookToLibrary(title, author, pages, completed);
  //display to ui
  displayBooks();
  //clear input
  inputArr.forEach((input) => (input.value = ""));

  //delete button
  deleteRow();
});

addBookToLibrary("Making Sense of God", "Timothy Keller", 500, "yes");
addBookToLibrary("Reading the Bible for a Change", "Ray Lubeck", 300, "no");

displayTable();
displayBooks();
deleteRow();
changeStatus();

console.log(myLibrary);
