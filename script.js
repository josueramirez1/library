const myLibrary = [];
const form = document.querySelector("form");
const table = document.querySelector("table");
const modal = document.querySelector(".modal");
const inputs = [...document.querySelectorAll("input[type='text']")];
const read = [...document.querySelectorAll("input[id='read']")];

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
});

// form
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
  let book = new Book(author, title, pages, choice.value);
  addBookToLibrary(book);
  // Remove modal once user submits response
  modal.classList.remove("show");
});

// CONSTRUCTOR FUNCTION TO CREATE BOOK

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// HELPER FUNCTIONS

function addBookToLibrary(book) {
  myLibrary.push(book);
  addBookToPage(book);
}

function addBookToPage(book) {
  let tr = document.createElement("tr");
  tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.read}</td><button class="remove">Remove</button>`;
  table.appendChild(tr);
}
