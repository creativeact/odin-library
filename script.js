// Declare myLibrary Array
const myLibary = [];

// Declare addBook and submitNewBook buttons
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.add-book-modal');
const submitNewBook = document.querySelector('.submit-new-book');

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
    }
};

// Add book to Library
function addBookToLibrary(Book) {
    myLibrary.push(Book);
};

// Display book
function displayBook() {
    for (const property in Book) {
        return this.property
    }
};

// Trigger the Add Book Modal
addBookButton.onclick = function () {
    addBookModal.style.display = "block";
};