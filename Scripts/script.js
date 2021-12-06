let myLibrary = [{
    title: "this is a title",
    description: "this is a description",
    author: "this is a author",
    read: false,
}];

class Book {
    constructor(title, description, author, read) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.read = read;
    }
}
function validateFields (field) {
if(!field.checkValidity())
{
    document.querySelector(`#error`).textContent = field.validationMessage;
}
else
{
    return true

}
}
const addBookBtn = document.querySelector("#Add-Book")
addBookBtn.addEventListener("click", () => {
    const titleI = document.querySelector(".title-input");
    const descI = document.querySelector(".description-input");
    const authI = document.querySelector(".author-input");
    let readI = document.querySelector(".read-input").value; //reads on or off
    if(readI === "on")
    {
        readI = true;
        console.log(readI)
    }
    else
    {
        readI = false;
    }
    const checkTitle =  validateFields(titleI);
    const checkDesc = validateFields(descI);
    if(checkTitle && checkDesc)
    {
        addBookToLibrary(titleI.value, descI.value, authI.value, readI.value);
    }
})

//I stands for input
function addBookToLibrary (titleI, descI, authI, readI) {
    let newBook = new Book();
    newBook.title = titleI;
    newBook.description = descI;
    newBook.author = authI;
    newBook.read = readI;
    myLibrary.push(newBook);
    clearBooks();
}
const bookDiv = document.querySelector(".books");
function clearBooks() {
    while(bookDiv.firstChild)
    {
        console.log(bookDiv.firstChild);
        bookDiv.removeChild(bookDiv.firstChild);
    }
   if(!bookDiv.firstChild)
   {
       displayBook();
   }
}
function displayBook () {
    for (let index = 0; index < myLibrary.length; index++) {
        const bookObj = myLibrary[index];
        const div = document.createElement("div");
        div.classList.add("Book");
        div.id = `${bookObj.title}`;
        bookDiv.append(div);
        const h2 = document.createElement("h2");
        h2.classList.add("title");
        h2.textContent = bookObj.title;
        div.append(h2);
        const h3 = document.createElement("h3");
        h3.classList.add("author");
        h3.textContent = bookObj.author;
        div.append(h3);
        const p = document.createElement("p");
        p.classList.add("description");
        p.textContent = bookObj.description;
        div.append(p);
        const readBtn = document.createElement("button");
        if(myLibrary[index].read === true)
        {
            readBtn.classList.add("have-read");
            readBtn.textContent = "Have Read, click to change";
        }
        else if(myLibrary[index].read === false)
        {
            readBtn.classList.add("have-not-read");
            readBtn.textContent = "Have Not Read, click to change";
        }
        readBtn.addEventListener('click', () => {
            readBook(index);
        })
        div.append(readBtn); 
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete Book";
        delBtn.classList.add("delete-button")
        delBtn.addEventListener('click', () => {
            deleteBook(index); 
        });
        div.append(delBtn);
    }
}
function readBook(index) {
    if(myLibrary[index].read === true)
    {
        myLibrary[index].read = false;
    }
    else 
    {
        myLibrary[index].read = true;
    }
    clearBooks();
}
function deleteBook (index) {
    let newArr = [];
    for (let i = 0; i < myLibrary.length; i++) {
        if(i === index)
        {
            continue;
        }
        else
        {
            newArr.push(myLibrary[i]);
        }
    }
    myLibrary = newArr.splice(0, newArr.length);
    clearBooks();
}