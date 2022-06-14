// Your web app's Firebase configuration
// Initialize Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBoNNoHhTV6YbHWxr2Bm0RCJiW9ZblD-D0",

  authDomain: "o-library-c1db9.firebaseapp.com",

  projectId: "o-library-c1db9",

  storageBucket: "o-library-c1db9.appspot.com",

  messagingSenderId: "1095897099758",

  appId: "1:1095897099758:web:d55d38cb4df72f232df2ff",
};
const app = initializeApp(firebaseConfig);
// src/index.js
import {
  getFirestore,
  getDoc,
  query,
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBoNNoHhTV6YbHWxr2Bm0RCJiW9ZblD-D0",

  authDomain: "o-library-c1db9.firebaseapp.com",

  projectId: "o-library-c1db9",

  storageBucket: "o-library-c1db9.appspot.com",

  messagingSenderId: "1095897099758",

  appId: "1:1095897099758:web:d55d38cb4df72f232df2ff",
});
const db = getFirestore(firebaseApp);
let myLibrary = [];
import { getStorage, ref } from "firebase/storage";
const storage = getStorage();
// Our book class, it creates an object with the following properties:
/* title, description, author, read */
class Book {
  constructor(title, description, author, read) {
    this.titleInput = title;
    this.descriptionInput = description;
    this.authorInput = author;
    this.readInput = read;
  }
}
// checks if the sent field is valid, if it is, it returns true
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
  const readI = document.querySelector(".read-input"); //reads on or off
  let readValue;
  if (readI.value === "on") {
    readValue = true;
  } else {
    readValue = false;
  }
  /** Validate each field */
  const checkTitle = validateFields(titleI);
  const checkDesc = validateFields(descI);
  const checkAuth = validateFields(authI);
  /** if either of the fields return false */
  if (checkTitle && checkDesc && checkAuth) {
    /** calls addBookToLibrary and makes sure to call the current values */
    addBookToLibrary(titleI.value, descI.value, authI.value, readValue);
  }
});
//I stands for input
function addBookToLibrary(titleI, descI, authI, readI) {
  /** Create a new book */
  let newBook = new Book();
  /** Make it's values equal the parameters */
  newBook.titleInput = titleI;
  newBook.descriptionInput = descI;
  newBook.authorInput = authI;
  newBook.readInput = readI;
  const index = findSimilarBook(newBook);
  //  if the book is not there, then we won't be adding duplicate books
  if (index === -1) {
    /** push the book to fireStore collection */
    addDoc(collection(db, "books"), {
      titleInput: titleI,
      descriptionInput: descI,
      authorInput: authI,
      readInput: readI,
    });
    /** Make sure our library array has it stored */
    myLibrary.push(newBook);
    fillMyLibrary();
  }
}
/* Tries to find a similar object to our bookObj thats
   recieved in the myLibrary array */
function findSimilarBook(bookObj) {
  let index = -1;
  for (let i = 0; i < myLibrary.length; i++) {
    const libraryObj = myLibrary[i];
    if (
      bookObj.titleInput === libraryObj.titleInput &&
      bookObj.authorInput === libraryObj.authorInput &&
      bookObj.descriptionInput === libraryObj.descriptionInput
    ) {
      index = i;
    }
  }
  return index;
}
/* fill the myLibrary array with Book objects before clearing books,
   these books come from our firebase, firestore database!*/
async function fillMyLibrary() {
  const q = query(collection(db, "books"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const bookObj = doc.data();
    bookObj.bookId = doc.id;
    // check if this bookObj is already in the myLibrary array
    const index = findSimilarBook(bookObj);
    if (index === -1) {
      myLibrary.push(bookObj);
    }
  });
  console.log(myLibrary);
  /** Clear all the DOM books from the bookDiv
   * to make space for the new book! */
  clearBooks();
}
/* We want to try to load all books at least once */
fillMyLibrary();
//  Store a reference to where we display the books
const bookDiv = document.querySelector(".books");
function clearBooks() {
  // While the bookDiv has children, clear that child
  while (bookDiv.firstChild) {
    bookDiv.removeChild(bookDiv.firstChild);
  }
  // If the bookDiv has no children, start displaying books instead.
  if (!bookDiv.firstChild) {
    listAllBooks();
  }
}
//  Goes through the entire library array and creates each element needed for the book
function listAllBooks() {
  function createBookContainer(bookObj) {
    //  Create a div for the book
    const div = document.createElement("div");
    div.classList.add("Book");
    div.id = `${bookObj.titleInput}`;
    return div;
  }
  function createTitle(bookObj) {
    //  create the title element of the book,
    //  in this case, an h2
    const h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = bookObj.titleInput;
    return h2;
  }
  function createAuthor(bookObj) {
    //  create the author element of the book,
    //  in this case, an h3
    const h3 = document.createElement("h3");
    h3.classList.add("author");
    h3.textContent = bookObj.authorInput;
    return h3;
  }
  function createDescription(bookObj) {
    //  create the description of the book,
    //  it will be a p element
    const p = document.createElement("p");
    p.classList.add("description");
    p.textContent = bookObj.descriptionInput;
    return p;
  }
  function createReadButton(bookObj, bookIndex) {
    //  Create the 'read this book' button and give it the appropiate class
    const readBtn = document.createElement("button");
    if (bookObj.readInput === true) {
      readBtn.classList.add("have-read");
      readBtn.textContent = "Have Read, click to change";
    } else if (bookObj.readInput === false) {
      readBtn.classList.add("have-not-read");
      readBtn.textContent = "Have Not Read, click to change";
    }
    //  No matter what class the readBtn is, it should have this function
    readBtn.addEventListener("click", () => {
      readBook(bookIndex);
    });
    return readBtn;
  }
  function createDeleteButton(bookIndex) {
    //  Create a delete book button if the user doesn't want this book anymore
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Book";
    delBtn.classList.add("delete-button");
    delBtn.addEventListener("click", () => {
      deleteBook(bookIndex);
    });
    return delBtn;
  }
  for (let index = 0; index < myLibrary.length; index++) {
    //  Reference the book object
    const bookObj = myLibrary[index];
    /* create the container, and elmements */
    const bookContainer = createBookContainer(bookObj);
    const booktitle = createTitle(bookObj);
    const bookAuthor = createAuthor(bookObj);
    const bookDescription = createDescription(bookObj);
    const readButton = createReadButton(bookObj, index);
    const deleteButton = createDeleteButton(index);
    /* append the elements */
    bookDiv.append(bookContainer);
    bookContainer.append(booktitle);
    bookContainer.append(bookAuthor);
    bookContainer.append(bookDescription);
    bookContainer.append(readButton);
    bookContainer.append(deleteButton);
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
async function deleteBook(index) {
  /* This section of deleteBook is for managing the myLibrary Array */
  let newArr = [];
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === index) {
      await deleteDoc(doc(db, "books", myLibrary[index].bookId));
      continue;
    } else {
      newArr.push(myLibrary[i]);
    }
  }
  myLibrary = newArr.splice(0, newArr.length);
  clearBooks();
  /* This sectione of deleteBook is for managing the FireBase collection*/
}
