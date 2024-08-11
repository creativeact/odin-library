// Declare myLibrary Array
const myLibrary = [];

// Declare relevant DOM elements
const bookContainer = document.querySelector('.book-container');
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');
const addBookForm = document.querySelector('.add-book-form');
const submitBookButton = document.querySelector('.submit-book-button');
const closeModalButton = document.querySelector('.close-modal-button');

// Book Object Constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    //this.read = read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}`;
    }
};

// Declare addBookToLibrary function
function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Open addBookModal
addBookButton.onclick = function () {
    addBookModal.style.display = "grid";
};

// Declare closeModal function to close addBookModal
function closeModal() {
    addBookModal.style.display = "none";
};

closeModalButton.onclick = function () {
    closeModal();
};

// Handle new book form submission
addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // Create newBook object with form values and call addBookToLibrary
    const newBook = new Book(title, author, pages);
    addBookToLibrary(newBook);

    // Create the new book card
    createBookCard(newBook);

    // Reset form values and close modal
    addBookForm.reset();
    closeModal();
});

// Function to create a new book card
function createBookCard(book) {

    // Create a new div with the class .book-card
    const newDiv = document.createElement('div');
    newDiv.classList.add('book-card');

    // Add title to book card
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = book.title;
    newDiv.appendChild(title);

    // Add author to book card
    const author = document.createElement('h4');
    author.classList.add('author');
    author.textContent = book.author;
    newDiv.appendChild(author);

    // Add pages to book card
    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = book.pages;
    newDiv.appendChild(pages);

    // Append new book card to book container
    bookContainer.appendChild(newDiv);
};

// Display all books in Library
for (Books in myLibrary) {
    displayBook(Book);
};


