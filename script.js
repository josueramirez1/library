const myLibrary = [];
const container = document.querySelector(".container");

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "completed" : "not read yet";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}.`;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  if (arguments.length === 0) return;
  myLibrary.push(new Book(title, author, pages, isRead));
}

addBookToLibrary("Making Sense of God", "Timothy Keller", 500, false);
addBookToLibrary("Reading the Bible for a Change", "Ray Lubeck", 300, false);

function displayBooks() {
  const table = document.createElement("table");
  const row = document.createElement("tr");
  const thTitle = document.createElement("th");
  const thAuthor = document.createElement("th");
  const thPages = document.createElement("th");
  const thIsRead = document.createElement("th");

  thTitle.textContent = "Title";
  thAuthor.textContent = "Author";
  thPages.textContent = "Pages";
  thIsRead.textContent = "Completed?";

  table.appendChild(row);
  row.append(thTitle, thAuthor, thPages, thIsRead);

  table.classList.add("table");
  console.log(container);

  myLibrary.forEach((book) => {
    console.log(book);
    const row = document.createElement("tr");
    const trTitle = document.createElement("td");
    trTitle.textContent = book.title;
    row.appendChild(trTitle);
    table.appendChild(row);
  });

  container.appendChild(table);
}

displayBooks();
