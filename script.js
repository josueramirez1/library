const body = document.querySelector("body");
console.log(body);
const myLibrary = [];

function Book(author, title) {
  this.author = author;
  this.title = title;
}

function addBookToLibrary(title, author) {
  let book = new Book(title, author);
  myLibrary.push(book);
}

function addBookToPage(arr) {
  if (!arr) return;
  arr.forEach((book) => {
    let result = `${book.title} by ${book.author}`;
    let div = document.createElement("div");
    div.append(result);
    body.appendChild(div);
  });
}

addBookToLibrary("Lord of the Rings", "J.R. Tolkien");
addBookToLibrary("Lord of the Rings", "J.R. Tolkien");
addBookToPage(myLibrary);
