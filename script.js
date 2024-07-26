const myLibrary = [];
const form = document.querySelector("form");
const table = document.querySelector("table");
const modal = document.querySelector(".modal");
const inputs = [...document.querySelectorAll("input[type='text']")];
const read = [...document.querySelectorAll("input[id='read']")];
let book;

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
    book.changeStatus();
  }
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
  book = new Book(author, title, pages, choice.value);

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

console.log(Book.prototype);

Book.prototype.changeStatus = function (e) {
  if (e.target.matches(".status")) {
    let readStatus = e.target.parentNode.previousElementSibling;
    if (readStatus.textContent === "No") {
      readStatus.textContent = "Yes";
    } else if (readStatus.textContent === "Yes") readStatus.textContent = "No";
  }
};

// HELPER FUNCTIONS

function addBookToLibrary(book) {
  book.id = new Date().valueOf();
  console.log(book);
  myLibrary.push(book);
  addBookToPage(book);
}

function addBookToPage(book) {
  let tr = document.createElement("tr");
  tr.setAttribute("class", "row");
  tr.setAttribute("data-id", `${book.id}`);
  tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.read}</td><td><button class="status">Change Status</button></td><button class="remove">Remove</button>`;
  table.appendChild(tr);
}
