const bookContainer = document.querySelector('.book-container');
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.modal-container');
const addBookForm = document.querySelector('.add-book-form');
const submitBookButton = document.querySelector('.submit-book-button');
const closeModalButton = document.querySelector('.close-modal-button');

// Initialize myLibrary
const myLibrary = [
    { title: 'IQ84', author: 'Haruki Murakami', pages: 944 },
    { title: 'Shogun', author: 'James Clavell', pages: 1136 },
    { title: 'Three Body Problem', author: 'Cixin Liu', pages: 426 },
    { title: 'Snow Crash', author: 'Neal Stephenson', pages: 576 },
    { title: 'Brothers Karamazov', author: 'Fyodor Dostoevsky', pages: 960 }
];

// Book class constructor
class Book {
    static #bookCounter = 0;

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = Book.#bookCounter++;
        this.read = false;
    }

    info() { return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.read ? 'Yes' : 'No'}, Id: ${this.id}` };
}

// Initial load of myLibrary
myLibrary.forEach((book, index) => {
    myLibrary[index] = new Book(book.title, book.author, book.pages);
});

// Declare addBookToLibrary function
function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Open addBookModal
addBookButton.onclick = function () {
    addBookModal.style.opacity = "1";
    addBookModal.style.zIndex = "1";
};

// Declare closeModal function to close addBookModal
function closeModal() {
    addBookModal.style.opacity = "0";
    addBookModal.style.zIndex = "-1";
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

// Function to render remove book icon
function renderTrashIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.classList.add('trash-icon');

    iconPath.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
};

// Function to render checkmark icon
function renderCheckmarkIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('display', 'none');
    iconSVG.setAttribute('fill', 'green');
    iconSVG.classList.add('checkmark-icon');

    iconPath.setAttribute('d', 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
};

// Function to create a new book card
function createBookCard(book) {

    // Create new book-card div
    const newDiv = document.createElement('div');
    newDiv.classList.add('book-card');

    // Append title
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = book.title;
    newDiv.appendChild(title);

    // Append author
    const author = document.createElement('h4');
    author.classList.add('author');
    author.textContent = book.author;
    newDiv.appendChild(author);

    // Append pages
    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = `Pages: ${book.pages}`;
    newDiv.appendChild(pages);

     // Append read status checkbox
     const readStatusContainer = document.createElement('div');
     readStatusContainer.classList.add('read-status-container');

     const readTitle = document.createElement('p');
     readTitle.textContent = 'Read';
     
     const input = document.createElement('input');
     input.setAttribute('type', 'checkbox');
     input.setAttribute('name', 'read-status');
     input.classList.add('read-status');
     input.setAttribute('data-id', book.id);

     readStatusContainer.appendChild(readTitle);
     readStatusContainer.appendChild(input);
     newDiv.appendChild(readStatusContainer);

    // Create card footer for remove book and read status icons
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    // Create remove book button
    const removeBookButton = document.createElement('button');
    removeBookButton.classList.add('remove-book-button');
    removeBookButton.setAttribute('data-id', book.id);

    // Render the trash icon and append it to the remove book button
    const trashIcon = renderTrashIcon();
    removeBookButton.appendChild(trashIcon);

    // Append remove book button with icon to card footer
    cardFooter.appendChild(removeBookButton);

    // Add checkmarkIcon
    const checkMarkIcon = renderCheckmarkIcon();
    checkMarkIcon.setAttribute('data-id', book.id);
    cardFooter.appendChild(checkMarkIcon);

    // Append card footer to the new div
    newDiv.appendChild(cardFooter);

    // Append new book card to book container
    bookContainer.appendChild(newDiv);
};

// Display books in myLibrary
myLibrary.forEach(book => createBookCard(book));

// Handle remove book button clicks
document.addEventListener('click', function(event) {

    // Handle clicks that target child elements inside .remove-book-button
    const removeButton = event.target.closest('.remove-book-button');

    if (removeButton) {
        // Retrieve the data-id associated with the button and convert to Int
        const bookId = parseInt(removeButton.getAttribute('data-id'), 10);
        removeBook(bookId);
    }
});

function removeBook(bookId) {

    // Alert user to confirm book removal
    const userConfirmed = confirm("Are you sure you want to remove this book?");

    if (userConfirmed) {
        // Find the index of the book in myLibrary
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        // Remove book from library
        myLibrary.splice(bookIndex, 1);

        // Remove book card
        const bookCard = document.querySelector(`.remove-book-button[data-id='${bookId}']`).parentElement.parentElement;
            if (bookCard) {
                bookContainer.removeChild(bookCard);
            } 
    }
    else return;
};

// Handle read status slider clicks
document.addEventListener('change', function(event) {
    const readSlider = event.target.matches('.read-status');

    if (readSlider) {
        const bookId = parseInt(event.target.getAttribute('data-id'), 10);
        changeReadStatus(bookId);
    }
});

// Change read status and display checkmark if book is read
function changeReadStatus(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    const checkMark = document.querySelector(`.checkmark-icon[data-id='${bookId}']`);

    if (myLibrary[bookIndex].read === false) {
        myLibrary[bookIndex].read = true;
        checkMark.style.display = 'grid';
    }
    else if (myLibrary[bookIndex].read === true) {
        myLibrary[bookIndex].read = false;
        checkMark.style.display = 'none';
    }
};

