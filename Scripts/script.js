let myLibrary = [{
    title: "this is a title",
    description: "this is a description",
    author: "this is a author",
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
    addBookToLibrary(titleI, descI, authI);
})
//I stands for input
function addBookToLibrary (titleI, descI, authI) {
    //console.log(titleI, descI, authI);
    let newBook = Object.create(Book);
    newBook.title = titleI;
    newBook.description = descI;
    newBook.author = authI;
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
        readBtn.textContent = "Read?";
        if(myLibrary[index].read === true)
        {
            readBtn.classList.add("have-read");
        }
        else
        {
            readBtn.classList.add("have-not-read");
        }
        readBtn.addEventListener('click', () => {
            readBook();
        })
        div.append(readBtn); 
        const delbtn = document.createElement("button");
        delbtn.textContent = "Delete Book";
        delbtn.addEventListener('click', () => {
            deleteBook(index); 
        });
        div.append(delbtn);
    }
}
function readBook(index) {

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