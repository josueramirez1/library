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
}

class displayLibray {
  myLibrary = [];
  container = document.querySelector(".container");
  bookContainer = document.querySelector(".books");
  addBtn = document.querySelector(".add-btn");
  closeBtn = document.querySelector(".close");
  form = document.querySelector("form");
  submitFormBtn = document.querySelector(".to-list-btn");
  modal = document.querySelector("dialog");

  change() {
    this.isRead = this.isRead === "Yes!" ? "No" : "Yes!";
  }

  displayTable() {
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
    this.bookContainer.appendChild(table);
  }

  addBookToLibrary(title, author, pages, isRead) {
    if (title === "" || author === "" || pages === "") return;
    this.myLibrary.push(new Book(title, author, pages, isRead));
    console.log(this.myLibrary);
  }

  deleteTable() {
    const currentTable = document.querySelector(".table");
    currentTable.remove();
  }

  displayBooks() {
    this.deleteTable();
    this.displayTable();
    const newTable = document.querySelector(".table");

    this.myLibrary.forEach((book) => {
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

  deleteRow() {
    let deleteBtns = [...document.querySelectorAll(".delete")];

    deleteBtns.forEach((deleteBtn, i) => {
      deleteBtn.addEventListener("click", (e) => {
        const targetRow = e.target.closest(".row");
        const idToDelete = targetRow.dataset.id;

        targetRow.remove();
        this.myLibrary = this.myLibrary.filter(
          (book) => book.id !== idToDelete,
        );
      });
    });
  }

  changeStatus() {
    let changeBtns = [...document.querySelectorAll(".change")];
    changeBtns.forEach((changeBtn) => {
      changeBtn.addEventListener("click", (e) => {
        const targetRow = e.target.closest(".row");
        const idToChange = targetRow.dataset.id;
        let toggle = changeBtn.parentElement.previousElementSibling;
        this.myLibrary.forEach((book) => {
          if (book.id === idToChange) {
            book.change();
            toggle.textContent = book.isRead;
          }
        });
      });
    });
  }

  init() {
    this.addBookToLibrary("Making Sense of God", "Timothy Keller", 500, "Yes!");
    this.addBookToLibrary(
      "Reading the Bible for a Change",
      "Ray Lubeck",
      300,
      "No",
    );

    this.displayTable();
    this.displayBooks();
    this.deleteRow();
    this.changeStatus();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputArr = [...document.querySelectorAll("input[type='text']")];

      const formData = new FormData(this.form);

      const title = formData.get("title");
      const author = formData.get("author");
      const pages = formData.get("pages");
      const completed = formData.get("completed");

      //add to array
      this.addBookToLibrary(title, author, pages, completed);
      //display to ui
      this.displayBooks();
      //clear input
      inputArr.forEach((input) => (input.value = ""));
      //delete button
      this.deleteRow();
      //change status button
      this.changeStatus();
    });
  }
}

const library = new displayLibray();

library.init();
