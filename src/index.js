// Your web app's Firebase configuration
// Initialize Firebase
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);

// src/index.js
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";

let myLibrary = [];

// Our book class, it creates an object with the following properties:
/* title, description, author, read */
class Book {
  constructor(title, description, author, read) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.read = read;
  }
}
function validateFields(field) {
  if (!field.checkValidity()) {
    document.querySelector(`#error`).textContent = field.validationMessage;
  } else if (field.value === "") {
    document.querySelector(
      `#error`
    ).textContent = `please fill out the missing fields`;
  } else {
    return true;
  }
}
const addBookBtn = document.querySelector("#Add-Book");
addBookBtn.addEventListener("click", () => {
  const titleI = document.querySelector(".title-input");
  const descI = document.querySelector(".description-input");
  const authI = document.querySelector(".author-input");
  let readI = document.querySelector(".read-input").value; //reads on or off
  if (readI === "on") {
    readI = true;
    console.log(readI);
  } else {
    readI = false;
  }
  const checkTitle = validateFields(titleI);
  const checkDesc = validateFields(descI);
  const checkAuth = validateFields(authI);
  if (checkTitle && checkDesc && checkAuth) {
    addBookToLibrary(titleI.value, descI.value, authI.value, readI.value);
  }
});

//I stands for input
function addBookToLibrary(titleI, descI, authI, readI) {
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
  while (bookDiv.firstChild) {
    console.log(bookDiv.firstChild);
    bookDiv.removeChild(bookDiv.firstChild);
  }
  if (!bookDiv.firstChild) {
    displayBook();
  }
}
function displayBook() {
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
    if (myLibrary[index].read === true) {
      readBtn.classList.add("have-read");
      readBtn.textContent = "Have Read, click to change";
    } else if (myLibrary[index].read === false) {
      readBtn.classList.add("have-not-read");
      readBtn.textContent = "Have Not Read, click to change";
    }
    readBtn.addEventListener("click", () => {
      readBook(index);
    });
    div.append(readBtn);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Book";
    delBtn.classList.add("delete-button");
    delBtn.addEventListener("click", () => {
      deleteBook(index);
    });
    div.append(delBtn);
  }
}
function readBook(index) {
  if (myLibrary[index].read === true) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
  clearBooks();
}
function deleteBook(index) {
  let newArr = [];
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === index) {
      continue;
    } else {
      newArr.push(myLibrary[i]);
    }
  }
  myLibrary = newArr.splice(0, newArr.length);
  clearBooks();
}

/* FireBase Setup */
// Import the functions you need from the SDKs you need

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBoNNoHhTV6YbHWxr2Bm0RCJiW9ZblD-D0",

  authDomain: "o-library-c1db9.firebaseapp.com",

  projectId: "o-library-c1db9",

  storageBucket: "o-library-c1db9.appspot.com",

  messagingSenderId: "1095897099758",

  appId: "1:1095897099758:web:d55d38cb4df72f232df2ff",
});
const db = getFirestore(firebaseApp);
