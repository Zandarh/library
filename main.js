const myLibrary = [];
let count = 0;

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };

    toggleReadStatus(){
        if (this.read == 'Completed'){
            this.read = "Not Read";
        }
        else{
            this.read = "Completed";
        }
    }
}

const book1 = new Book("Born a Crime", "Trevor Noah", "304", "Completed");
const book2 = new Book("Outliers", "Malcolm Gladwell", "304", "Completed");
const book3 = new Book("12 Rules of Life", "Jordan Peterson", "448", "Not Read")
const book4 = new Book("All Marketer are Liars", "Seth Godin", "240", "Not Read")


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
displayBookOnScreen(myLibrary);

// add each new book object to the Library array
function addBookToLibrary(obj){
    myLibrary.push(obj);
}

// removes  all child elements on the screen
function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
        count = 0;
    }
}

// displays the book
function displayBookOnScreen(myLibrary){

    const bookDiv = document.querySelector('.book-container');
    removeAllChildNodes(bookDiv); // to prevent printing a card multiple times

    myLibrary.forEach(book => {

        const books = document.createElement('div');
        books.setAttribute("class", "books");

        const title = document.createElement('h3');
        title.textContent = `${book.title}`;
        title.setAttribute("class", "title");
        books.append(title);

        const author = document.createElement('h4');
        author.textContent = `by ${book.author}`;
        author.setAttribute("class", "author");
        books.append(author);

        const pages = document.createElement('h4');
        pages.textContent = `${book.pages} pages`;
        pages.setAttribute("class", "pages");
        books.append(pages);

        const read = document.createElement('h4');
        read.textContent = `Status: ${book.read}`;
        read.setAttribute("class", "read");
        books.append(read);

        const buttonDiv = document.createElement('div');
        buttonDiv.setAttribute("class", "button-div");
        
        // Creating the read status update button
        const readChecker = document.createElement('button');
        readChecker.textContent = "Read";
        readChecker.setAttribute("class", "read-status-toggle");
        readChecker.setAttribute("data-myid", count);
        buttonDiv.append(readChecker);

        // The delete button
        const deleteBook = document.createElement('button');
        deleteBook.textContent = "Delete";
        deleteBook.setAttribute("class", "delete-book");
        deleteBook.setAttribute("data-myid", count);
        const bookCount = count;
        buttonDiv.append(deleteBook);

        books.append(buttonDiv);

        bookDiv.prepend(books);

        // Update the read status
        const readStatus = document.getElementsByClassName('read-status-toggle');
        for (let i = 0; i < readStatus.length; i++){
            readStatus[i].addEventListener('click', (e) => {
            book.toggleReadStatus(); // Book prototype method
            updateStatus(e, book);
        });
        break;    
    }

        // deleting
        const toDelete = document.querySelector('.delete-book')
        
        toDelete.addEventListener('click', (e) => {
            const parent = e.target.parentNode.parentNode;
            myLibrary.splice(bookCount, 1);
            parent.remove();
        });
        count++;

    });
}

function updateStatus(e, book){
    // getting the text node to be updated.
    const sib = e.target.parentNode.previousElementSibling;
    

    const newStatus = document.createElement('h4');
    newStatus.textContent = `Status: ${book.read}`;
    newStatus.setAttribute("class", "read");
    sib.replaceWith(newStatus);
}

const btn = document.querySelector('#btn');
const myDialog = document.querySelector('#myDialog');
const overlay = document.querySelector('.overlay');

btn.addEventListener('click', (event) => {
    overlay.style.display = "block";
    myDialog.showModal();
});


const dialogBtn = document.querySelector('#myForm');

dialogBtn.addEventListener('submit', (event) => {

    // The modal Element
    const title = document.querySelector('#bookTitle')
    const bookTitle = title.value;

    const author = document.querySelector('#bookAuthor')
    const bookAuthor = author.value;

    const pages = document.querySelector('#bookPages');
    const bookPages = pages.value;

    const checkbox = document.querySelector('#readOrNot');
    let checked = '';
    if (checkbox.checked)
        checked += 'Completed';
    else
        checked += 'Not Read';
    checkbox.checked = false;
    makeNewObject(bookTitle, bookAuthor, bookPages, checked);
    dialogBtn.reset();
    overlay.style.display = "none";

});

function makeNewObject(bookTitle, bookAuthor, bookPages, checked){
    const book = new Book(bookTitle, bookAuthor, bookPages, checked);
    addBookToLibrary(book);
    displayBookOnScreen(myLibrary);
}

const closeDialog = document.querySelector('.close');

closeDialog.addEventListener('click', () =>{
    myDialog.close();
    overlay.style.display = "none";
});