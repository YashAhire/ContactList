//require the library
const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://127.0.0.1:27017/contacts_lists_db");

// acquire the connection (to check it is successful)
const db = mongoose.connection;

// error msg
db.on('error', function(err){console.log(err.message)});

// up and running the print msg
db.once('open',function(){
    console.log("Successfully connected to database");
});
