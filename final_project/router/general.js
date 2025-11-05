const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


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
 // res.send(JSON.stringify({"message" : "success register"}));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //return res.status(300).json({message: "Yet to be implemented"});
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
      let myPromise = new Promise((resolve,reject) => {
          resolve(JSON.stringify(books,null,4));
      });
    //Call the promise and wait for it to be resolved and then print a message.
      myPromise.then((successMessage) => {
          //console.log("From Callback " + successMessage)
          res.send(successMessage);
      })
  })

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
      let byIsbn = req.params.isbn;
      let myPromise = new Promise((resolve,reject) => {
          resolve(JSON.stringify(books[byIsbn]));
      });
      //Call the promise and wait for it to be resolved and then print a message.
      myPromise.then((successMessage) => {
          //console.log("From Callback " + successMessage)
          res.send(successMessage);
      })
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
    const byAuthor = req.params.author;   
    const result = [];
    try{
        const keys = Object.keys(books);
            // iterate key, check author
            keys.forEach(key => {
                if (books[key].author.toLowerCase() === byAuthor.toLowerCase()) {
                    result.push(books[key]);
                }
            });
            res.json(result)
            //console.log(JSON.parse(data));
            //res.send(JSON.stringify(result, null, 4));
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "error" });
        }
    
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const byTitle = req.params.title;       // ดึงชื่อผู้แต่งจาก URL
  const keys = await Object.keys(books);          // เอา keys ของ object
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
