let myLibrary = [{
    title: "this is a title",
    description: "this is a description",
    author: "this is a author",
}];

function Book(title, description, author) {
    this.title = title;
    this.description = description;
    this.author = author;
}
const addBookBtn = document.querySelector("#Add-Book")
addBookBtn.addEventListener("click", () => {
    const titleI = document.querySelector(".title").textContent;
    const descI = document.querySelector(".description").textContent;
    const authI = document.querySelector(".author").textContent;
    addBookToLibrary(titleI, descI, authI);
})
//I stands for input
function addBookToLibrary (titleI, descI, authI) {
    console.log(titleI, descI, authI);
    let newBook = Object.create(Book);
    newBook.title = titleI;
    newBook.description = descI;
    newBook.author = authI;
    myLibrary.push(newBook);
}
const body = document.querySelector("body");
displayBook();
function displayBook () {
    for (let index = 0; index < myLibrary.length; index++) {
        const bookObj = myLibrary[index];
        const div = document.createElement("div");
        div.classList.add("Book");
        div.id = `${bookObj.title}`;
        body.append(div);
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
    }
}