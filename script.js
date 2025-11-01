/*
 * script.js
 * Allows selection of book items on the page and enables editing to store the current list of books in localStorage
 * Created: March 2024 Dijone Mehmeti
 * Updated: March 2024 Dijone Mehmeti
 * Taken and adapted from Erik Steinmetz
 */

// Array as default database for books in local storage
var defaultBooks = [
    {
        "title": "The Fault in Our Stars",
        "author": "John Green",
        "copyright": "2012",
        "pages": 313,
        "cover": "https://covers.openlibrary.org/b/id/7222248-L.jpg"
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "copyright": "1925",
        "pages": 218,
        "cover": "https://covers.openlibrary.org/b/id/7222245-L.jpg"
    }, 
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "copyright": "1937",
        "pages": 310,
        "cover": "https://covers.openlibrary.org/b/id/6839832-L.jpg"
    }, 
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "copyright": "1960",
        "pages": 281,
        "cover": "https://covers.openlibrary.org/b/id/7995793-L.jpg"
    },
    {
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "copyright": "1997",
        "pages": 309,
        "cover": "https://covers.openlibrary.org/b/id/7301768-L.jpg"
    }
];

//window.addEventListener("DOMContentLoaded", pageLoadedMain);

// Function that runs when DOM has loaded
window.addEventListener("DOMContentLoaded", function() {
    clearLocalStorage(); // It clears localStorage when page loads, getting rid of undefined's
    pageLoadedMain();
});

// Main function that initializes the page
function pageLoadedMain() {
    loadDefaultBooksIfNeeded();
    loadBookTitles();
    addBookNameListeners();
    addButtonListeners();
}

// Function that loads default books from array into localStorage even if it is empty
function loadDefaultBooksIfNeeded() {
    // Checking if there is an "undefined" entry in localStorage and removing it
    if (localStorage.getItem("undefined")) {
        localStorage.removeItem("undefined");
    }
    
    // Checking if localStorage is empty
    if (localStorage.length == 0) {
        // Looping through each book in defaultBooks array
        defaultBooks.forEach(aBook => {
            // Checking if book title is not undefined
            if (aBook.title !== undefined) {
                // Converting book object to a string and storing it in localStorage
                localStorage.setItem(aBook.title, JSON.stringify(aBook));
            }
        });
    }
}


// Creating an unordered list of book titles from books that are in localStorage and placing it in navigation
function loadBookTitles() {
    // Initializing an empty string to store the HTML list elements
    var listing = "<ul>\n";

    // Looping through each item in localStorage
    for (var j = 0; j < localStorage.length; j++) {
        // Getting book object string from localStorage
        let aBookString = localStorage.getItem(localStorage.key(j));
        
        // Checking if retrieved string is undefined
        if (aBookString) {
            // Parsing book object string into js object
            let aBookObject = JSON.parse(aBookString);
            
            // Appending book title as a list item to HTML list
            listing += "<li>" + aBookObject.title + "</li>\n";
        }
    }

    // Closing unordered list
    listing += "</ul>\n";
    
    // Getting navigation element and setting innerHTML to list
    var navNodes = document.getElementsByTagName("nav");
    var navNode = navNodes[0];
    navNode.innerHTML = listing;
}

// Function that clears localStorage
function clearLocalStorage() {
    localStorage.clear();
    loadBookTitles(); // Reloading book titles after clearing localStorage
}


// Adding a click event listener to each book title in navigation, calling onSelect too
function addBookNameListeners() {
    var liNodes = document.getElementsByTagName("li");
    for (var i = 0; i < liNodes.length; i++) {
        var aNameNode = liNodes[i];
        aNameNode.addEventListener("click", onSelect);
    }
}

// Adding listeners to edit and add buttons as well
function addButtonListeners() {
    let editButton = document.getElementById("editbutton");
    editButton.addEventListener("click", onEdit);
    let addButton = document.getElementById("addbutton");
    addButton.addEventListener("click", onAdd);
}


// Function that fills main section with details of selected book
function onSelect() {
    // Get title of selected book
    let bookTitle = this.innerHTML;

    // Get book details from localStorage based on title
    let targetBookString = localStorage.getItem(bookTitle);
    let targetBookObject = JSON.parse(targetBookString);

    // Fill input fields in main with book details
    var titleNode = document.getElementById("title");
    titleNode.value = targetBookObject.title;
    var authorNode = document.getElementById("author");
    authorNode.value = targetBookObject.author;
    var copyrightNode = document.getElementById("copyright");
    copyrightNode.value = targetBookObject.copyright;
    var pagesNode = document.getElementById("pages");
    pagesNode.value = targetBookObject.pages;

    // Calling searchBookByTitle function to update cover image
    searchBookByTitle(targetBookObject.title);
}

// Function that allows user to edit currently selected book
function onEdit() {
    console.log("onEdit called");
    // Checking if button is in 'Edit' mode
    if( this.innerHTML == "Edit") {
        // Entering edit mode
        this.innerHTML = "Save";

         // Enabling editing of input fields
        var titleNode = document.getElementById("title");
        titleNode.readOnly = false;
        var authorNode = document.getElementById("author");
        authorNode.readOnly = false;
        var copyrightNode = document.getElementById("copyright");
        copyrightNode.readOnly = false;
        var pagesNode = document.getElementById("pages");
        pagesNode.readOnly = false;

        // Disabling add button
        let addButton = document.getElementById("addbutton");
        addButton.setAttribute( "disabled", true);
    }
    else {
        // Exiting edit mode
        this.innerHTML = "Edit";
        var titleNode = document.getElementById("title");
        var bookTitle = titleNode.value;
        var authorNode = document.getElementById("author");
        var author = authorNode.value;
        var copyrightNode = document.getElementById("copyright");
        var copyright = copyrightNode.value;
        var pagesNode = document.getElementById("pages");
        var pages = pagesNode.value;

        // Save the new edited data to localStorage
        var editedBook = {
            "title": bookTitle,
            "author": author,
            "copyright": copyright,
            "pages": pages
        };
        localStorage.setItem(bookTitle, JSON.stringify(editedBook));

        // Enabling add button
        let addButton = document.getElementById("addbutton");
        addButton.removeAttribute( "disabled");
    }
}

// Function that allows user to add new book
function onAdd() {
    // Checking if button is in 'Add' mode
    if (this.innerHTML == "Add") {
        // Entering 'Add' mode
        this.innerHTML = "Save";

        // Clearing input fields and enabling editing with details
        var titleNode = document.getElementById("title");
        titleNode.value = "";
        titleNode.readOnly = false;
        var authorNode = document.getElementById("author");
        authorNode.value = "";
        authorNode.readOnly = false;
        var copyrightNode = document.getElementById("copyright");
        copyrightNode.value = "";
        copyrightNode.readOnly = false;
        var pagesNode = document.getElementById("pages");
        pagesNode.value = "";
        pagesNode.readOnly = false;

        // Disabling edit button
        let editButton = document.getElementById("editbutton");
        editButton.setAttribute("disabled", true);
    } else {
        // Exiting 'Add' mode
        this.innerHTML = "Add";

        // Creating new book object and populating fields
        var newBook = {};
        var titleNode = document.getElementById("title");
        newBook.title = titleNode.value;
        titleNode.readOnly = true;
        var authorNode = document.getElementById("author");
        newBook.author = authorNode.value;
        authorNode.readOnly = true;
        var copyrightNode = document.getElementById("copyright");
        newBook.copyright = copyrightNode.value;
        copyrightNode.readOnly = true;
        var pagesNode = document.getElementById("pages");
        newBook.pages = pagesNode.value;
        pagesNode.readOnly = true;

        // Putting new book into localStorage and updating list
        localStorage.setItem(newBook.title, JSON.stringify(newBook));
        loadBookTitles();
        addBookNameListeners();

        // Enabling edit button
        let editButton = document.getElementById("editbutton");
        editButton.removeAttribute("disabled");
    }
}

// Function that searches for a book by title and gets ISBN and cover image URL
function searchBookByTitle(title) {
    // Constructing URL for API request
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

    // Making GET request to API
    fetch(url)
        .then(response => {
            // Checking if request is successfully completed
            if (!response.ok) {
                throw new Error('Network response was not successful');
            }
            // Parsing JSON response
            return response.json();
        })
        .then(data => {
            // Getting ISBN and cover image URL from response
            const book = data.docs[0]; 
            const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
            const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

            // Displaying new taken information
            console.log('ISBN:', isbn);
            console.log('Cover Image URL:', coverUrl);

            // Updating cover image URL in selected book section
            var coverNode = document.getElementById("cover");
            coverNode.src = coverUrl;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


