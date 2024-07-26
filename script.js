const myLibrary = [];
const container = document.querySelector(".container");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");

addBookBtn.addEventListener("click", (e) => {
  modal.style.display = "block";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// CONSTRUCTOR FUNCTION TO CREATE BOOK

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

// HELPER FUNCTIONS

function addBookToLibrary(title, author, pages, read) {}

// function addBookToPage(arr) {
//   if (!arr) return;
//   let tr = document.createElement("tr");
//   arr.forEach((book) => {
//     let tr = document.createElement("tr");
//     tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.read}</td>`;
//     table.appendChild(tr);
//   });
// }
