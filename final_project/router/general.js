const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    // Check if the user does not already exist
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});

}
// Return error if username or password is missing
return res.status(404).json({message: "Unable to register user."});
  res.send(JSON.stringify({"message" : "success register"}));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let ISBNcode = req.params.isbn;
  res.send(JSON.stringify({"ISBN" : ISBNcode}));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const byAuthor = req.params.author;       // ดึงชื่อผู้แต่งจาก URL
  const keys = Object.keys(books);          // เอา keys ของ object
  const result = [];

// iterate key, check author
  keys.forEach(key => {
    if (books[key].author.toLowerCase() === byAuthor.toLowerCase()) {
      result.push(books[key]);
    }
  });

  //res.send(JSON.stringify(result, null, 4));
    res.json(result)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const byTitle = req.params.title;       // ดึงชื่อผู้แต่งจาก URL
  const keys = Object.keys(books);          // เอา keys ของ object
  const result = [];
// iterate key, check title
  keys.forEach(key => {
    if (books[key].title.toLowerCase() === byTitle.toLowerCase()) {
      result.push(books[key]);
    }
  });
  //res.send(JSON.stringify(result, null, 4));
    res.json(result)
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const byIsbn = req.params.isbn;       // ดึงชื่อผู้แต่งจาก URL
  const keys = Object.keys(books);          // เอา keys ของ object
  const result = [];
// iterate key, check title
  keys.forEach(key => {
    if (key=byIsbn) {
        res.json(books[key].review);
      //result.push(books[key]);
    }
  });
  //res.send(JSON.stringify(result, null, 4));
    //res.json(result)

  
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
