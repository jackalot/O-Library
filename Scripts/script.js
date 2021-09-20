let myLibrary = [];

function Book(title, description, author) {
    this.title = title;
    this.description = description;
    this.author = author;
}
//I stands for input
function addBookToLibrary (titleI, descI, authI) {
    let newBook = Object.create(Book);
    newBook.title = titleI;
    newBook.description = descI;
    newBook.author = authI;
    myLibrary.push(newBook);
}
function displayBook () {
    
    for (let index = 0; index < myLibrary.length; index++) {
        const element = array[index];
        
    }
}