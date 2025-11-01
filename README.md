# Books Collection Web Application

A dynamic JavaScript web application that manages and displays a collection of books.  
This project builds upon the previous "Foods Application" and demonstrates interactive DOM manipulation, localStorage persistence, and API integration using the [Open Library API](https://openlibrary.org/developers/api).

## Features

- Display a list of books with details:
  - **Title**
  - **Author**
  - **Copyright Date**
  - **Number of Pages**
  - **Cover Image**
- **Edit existing books** directly on the webpage
- **Add new books** through an input form
- **Persistent data storage** using `localStorage`
- **Dynamic cover image retrieval** using the Open Library API (`openlibrary.org`)
- Responsive and user-friendly interface built with HTML, CSS, and JavaScript

## Technologies Used
- **HTML5** for page structure  
- **CSS3** for styling and layout  
- **JavaScript (ES6)** for functionality and interactivity  
- **Open Library API** for fetching book cover and ISBN data  
- **localStorage** for saving and retrieving user data locally

- ## How It Works

1. **Book Data Management**
   - Each book record includes: `title`, `author`, `copyright`, `pages`, and a `coverURL`.
   - All book data is stored in the browser’s `localStorage` variable, allowing persistence between sessions.

2. **Adding a Book**
   - Click the **“Add Book”** button.
   - Fill in the form fields (title, author, etc.).
   - On submission, the app saves the new entry to `localStorage` and displays it in the list.

3. **Editing a Book**
   - Each book entry includes an **“Edit”** button.
   - Clicking it enables inline editing of all fields.
   - After confirming changes, the app updates the `localStorage` record and re-renders the list.

4. **Fetching Cover Images**
   - When a new book is added, the app queries the Open Library API:
     ```
     https://openlibrary.org/search.json?title=<book_title>
     ```
   - From the API response, it extracts the **ISBN** and constructs the cover URL:
     ```
     https://covers.openlibrary.org/b/isbn/<isbn>-L.jpg
     ```
   - This URL is stored and displayed in an `<img>` tag for each book.
