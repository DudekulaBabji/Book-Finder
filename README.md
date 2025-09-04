# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# 📚 Book Finder

A simple and lightweight React app that lets you search for books by title using the Open Library API.

---



##  Features

- Search for books by title  
- View book title, author(s), and first publish year  
- Clean, minimal design for easy browsing

---

##  How It Works

When a user enters a book title and submits the form, the app sends a request to the [Open Library Search API](https://openlibrary.org/search.json?title=) and displays the results in a list format.

1)The user enters a book title into the search bar.

2)When the search button is clicked, the app makes a fetch request to the Open Library Search API.

3)The API returns a JSON response containing a list of books related to the search query.

4)The app extracts important details such as:

    Book Title

    Author Name(s)

    First Publish Year

5)The results are displayed dynamically on the screen in a clean list format.

6)If no books are found, the app shows a message to let the user know.

7)Since the app uses React, every time a new search is made, the state updates automatically and re-renders the results without refreshing the page.

---

