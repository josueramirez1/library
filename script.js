const myLibrary = [];
const container = document.querySelector(".container");
const bookContainer = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
const submitFormBtn = document.querySelector(".to-list-btn");

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "Yes!" : "No";
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

  myLibrary.forEach((book) => {
    const rowD = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdIsRead = document.createElement("td");

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdIsRead.textContent = book.isRead;

    rowD.append(tdTitle, tdAuthor, tdPages, tdIsRead);
    table.appendChild(rowD);
  });

  bookContainer.appendChild(table);
}

displayBooks();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.add("active");
  container.style.backgroundColor = "hsl(177, 70%, 21%)";

  document.addEventListener("click", (e) => {
    if (e.target.matches(".container")) {
      form.classList.remove("active");
      container.style.backgroundColor = "hsl(177, 70%, 41%)";
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  console.log(formData);
  const title = formData.get("title");
  console.log(title);
});
