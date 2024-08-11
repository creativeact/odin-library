// Declare myLibrary Array
const myLibrary = [];

// Declare DOM elements
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');
const submitBookButton = document.querySelector('.submit-book-button');
const closeModalButton = document.querySelector('.close-modal-button');
const newBookForm = document.querySelector('.new-book-form');

// Book Constructor
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

// Handle new book form submission
newBookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // Create newBook object with form values
    const newBook = new Book(title, author, pages);

    addBookToLibrary(newBook);

    // Reset form values and close modal
    newBookForm.reset();
    closeModal();
});

// Display book prototype
function displayBook() {
    for (const property in Book) {
        return this.property
    }
};

// Open Add Book Modal
addBookButton.onclick = function () {
    addBookModal.style.display = "grid";
};

// Declare Close Modal function;
function closeModal() {
    addBookModal.style.display = "none";
};

closeModalButton.onclick = function () {
    closeModal();
};
