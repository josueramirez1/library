const myLibrary = [];
const container = document.querySelector(".container");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");
const table = document.querySelector("table");

// Make modal appear and disappear
addBookBtn.addEventListener("click", (e) => {
  modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Select all inputs
  let title = document.querySelector("input[id='title']").value;
  let author = document.querySelector("input[id='author']").value;
  let pages = parseInt(document.querySelector("input[id='pages']").value);
  let read = document.querySelector("input[id='read']").checked;
  // Send values to constructor function
  let book = new Book(author, title, pages, read);

  addBookToLibrary(book);
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
  addBookToPage(myLibrary);
}

function addBookToPage(arr) {
  arr.forEach((book) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.read}</td><button class="remove">Remove</button>`;
    table.appendChild(tr);
  });
}
