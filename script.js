// Declare relevant DOM elements
const bookContainer = document.querySelector('.book-container');
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');
const addBookForm = document.querySelector('.add-book-form');
const submitBookButton = document.querySelector('.submit-book-button');
const closeModalButton = document.querySelector('.close-modal-button');
const removeBookButton = document.querySelector('.remove-book-button');
const readBookToggle = document.querySelector('.read-book-toggle');

// Declare myLibrary Array
const myLibrary = [
    { title: 'IQ84', author: 'Haruki Murakami', pages: 944, id: 0, },
    { title: 'Shogun', author: 'James Clavell', pages: 1136, id: 1, }
];

// Initialize counter to reference for book ids
let bookCounter = 2;

// Book Object Constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = bookCounter++;
    //this.read = read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.id}`;
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

// Function to create remove book icon
function renderTrashIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.classList.add('trash-icon');

    iconPath.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
};

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
    pages.textContent = `Pages: ${book.pages}`;
    newDiv.appendChild(pages);

     // Add read status checkbox
     const readTitle = document.createElement('p');
     readTitle.textContent = 'Read';
     
     const input = document.createElement('input');
     input.setAttribute('type', 'checkbox');
     input.setAttribute('id', 'read-status');
     input.setAttribute('name', 'read-status');
     input.classList.add('read-status');

     const readStatusContainer = document.createElement('div');
     readStatusContainer.classList.add('read-status-container');

     readStatusContainer.appendChild(readTitle);
     readStatusContainer.appendChild(input);
     newDiv.appendChild(readStatusContainer);


    // Create remove book button
    const removeBookButton = document.createElement('button');
    removeBookButton.classList.add('remove-book-button');
    removeBookButton.setAttribute('data-id', book.id);

    // Render the trash icon and append it to the remove book button
    const trashIcon = renderTrashIcon();
    removeBookButton.appendChild(trashIcon);

    // Append remove book button with icon
    newDiv.appendChild(removeBookButton);

    // Append new book card to book container
    bookContainer.appendChild(newDiv);
};

// Display books in myLibrary
myLibrary.forEach(book => createBookCard(book));

// Handle remove book button clicks
bookContainer.addEventListener('click', function(event) {

    // Handle clicks that target child elements inside .remove-book-button
    const button = event.target.closest('.remove-book-button');

    if (button) {
        // Retrieve the data-id associated with the button and convert to Int
        const bookId = parseInt(button.getAttribute('data-id'), 10);

        // Call removeBook
        removeBook(bookId);
    }
});

function removeBook(bookId) {
    
    // Find the index of the book within the myLibrary array
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    // Remove book from library
    myLibrary.splice(bookIndex, 1);

    // Reduce book counter
    bookCounter--;

    // Remove book card
    const bookCard = document.querySelector(`.book-card button[data-id='${bookId}']`).parentElement;
        if (bookCard) {
            bookContainer.removeChild(bookCard);
        } 
};

