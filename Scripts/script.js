let myLibrary = [{
    title: "this is a title",
    description: "this is a description",
    author: "this is a author",
    read: false,
}];

function Book(title, description, author, read) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.read = read;
}
const addBookBtn = document.querySelector("#Add-Book")
addBookBtn.addEventListener("click", () => {
    const titleI = document.querySelector(".title-input").value;
    const descI = document.querySelector(".description-input").value;
    const authI = document.querySelector(".author-input").value;
    let readI = document.querySelector(".read-input").value; //reads on or off
    if(readI === "on")
    {
        readI = true;
        console.log(readI)
    }
    addBookToLibrary(titleI, descI, authI, readI);
})
//I stands for input
function addBookToLibrary (titleI, descI, authI, readI) {
    let newBook = Object.create(Book);
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
        else
        {
            readBtn.classList.add("have-not-read");
            readBtn.textContent = "Have Not Read, click to change";
        }
        readBtn.addEventListener('click', () => {
            readBook();
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