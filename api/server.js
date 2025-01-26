const express = require("express");
// This line imports the 'cors' library, which helps our server talk to other websites safely.
const cors = require("cors");

// This line imports the 'mongoose' library, which helps us connect to a database and manage data easily.
const mongoose = require("mongoose");

// This line loads the environment variables from the .env file, so we can use them in our code.
require("dotenv").config();

// This line imports the 'cookie-parser' library, which helps us read cookies that come with requests.
const cookieParser = require("cookie-parser"); // cookie parser is used to parse the cookies in the request
const app = express();
// This line of code tells our server to understand and use JSON data, which is a way to organize information that computers can easily read. 
// It helps us get data from the people using our app, like when they fill out a form or send us information.
app.use(express.json()); 

// The 'extended: true' part means that it can handle more complex data, like when someone uploads a file or sends a lot of information at once.
app.use(express.urlencoded({ extended: true }));
// This line of code allows our server to talk to other websites safely. 
// It's like a gatekeeper that checks if the other website is allowed to talk to us.
app.use(cors()); 
// This line of code helps us read cookies that come with requests. 
// Cookies are small pieces of information that websites store on a person's computer to remember things like their login information.
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schoolManagement2025')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  }); 

app.get("/test", (req, res) => {
  res.send("Hello World");
});

/** Port number for server to listen on. If there's no number set in computer's special file, uses 5001  */
const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid EADDRINUSE error

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
