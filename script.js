const myLibary = [];
const addBookButton = document.querySelector('.add-book-button');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
    }
};

function addBookToLibrary(Book) {
    myLibrary.push(Book);
};

function displayBook() {
    for (const property in Book) {
        return this.property
    }
};
