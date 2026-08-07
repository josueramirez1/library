function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "completed" : "not read yet";
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}.`,
    );
  };
}

const book1 = new Book("Harry Potter", "J. R. Tolkien", 320, false);

book1.info();
