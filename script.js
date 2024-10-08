// CONSTRUCTOR FUNCTION TO CREATE BOOK
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeStatus(e) {
    if (e.target.matches(".status")) {
      let readStatus = e.target.parentNode.previousElementSibling;
      if (readStatus.textContent === "No") {
        readStatus.textContent = "Yes";
      } else if (readStatus.textContent === "Yes")
        readStatus.textContent = "No";
    }
  }
}

// HELPER FUNCTIONS

function addBookToLibrary(book) {
  const myLibrary = [];
  const getMyLibrary = () => myLibrary;
  getMyLibrary().push(book);
  addBookToPage(book);
}

function addBookToPage(book) {
  const table = document.querySelector("table");
  let tr = document.createElement("tr");
  tr.setAttribute("class", "row");
  // tr.setAttribute("data-id", `${book.id}`);
  table.appendChild(tr);

  let values = Object.values(book);
  values.forEach((value) => {
    let td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });
  let actionsTd = document.createElement("td");

  let statusBtn = document.createElement("button");
  statusBtn.setAttribute("class", "status");
  statusBtn.textContent = "Change Status";

  let removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove");
  removeBtn.textContent = "Remove";

  actionsTd.appendChild(statusBtn);
  actionsTd.appendChild(removeBtn);
  actionsTd.setAttribute("class", "actions");
  tr.appendChild(actionsTd);
}

// Function to initiate event listeners

function startEvents() {
  const form = document.querySelector("form");
  const modal = document.querySelector(".modal");
  const textInputs = [...document.querySelectorAll("input[type='text']")];
  const numberInputs = [...document.querySelectorAll("input[type='number']")];
  const inputs = [...textInputs, ...numberInputs];
  const read = [...document.querySelectorAll("input[id='read']")];
  let book;

  // EVENT LISTENERS
  document.addEventListener("click", (e) => {
    // Make modal appear and disappear
    if (e.target.matches(".add-book-btn")) {
      modal.classList.add("show");
      for (let userInput of inputs) {
        userInput.value = "";
      }
      read.forEach((mark) => {
        mark.checked = false;
      });
    }
    if (e.target.matches(".modal")) modal.classList.remove("show");

    if (e.target.matches(".remove")) {
      let row = e.target.closest(".row");
      // let row = e.target.closest(".row").dataset.id;
      row.remove();
    }

    if (e.target.matches(".status")) {
      book.changeStatus(e);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Select all inputs
    let title = document.querySelector("input[id='title']").value;
    let author = document.querySelector("input[id='author']").value;
    let pages = parseInt(document.querySelector("input[id='pages']").value);

    // variable to check if user chose a radio button
    const noChoice = read.map((mark) => mark.checked);
    if (!title || !author || !pages || noChoice.forEach((btn) => btn === false))
      return;
    // If user chose a radio button, find value of chosen radio button
    const choice = read.find((mark) => {
      if (mark.checked) {
        return mark.value;
      }
    });
    // Use variable to create new object and add it to the library
    book = new Book(title, author, pages, choice.value);

    addBookToLibrary(book);
    // Remove modal once user submits response
    modal.classList.remove("show");
  });
}
// initiate event listener
const addBooks = startEvents();
