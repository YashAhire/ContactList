const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());   // this is middleware 
app.use(express.static('assets'));

// //middleware 1
// app.use(function(req,res,next){
//     // console.log("it is MW1");
//     // req.myname = 'ash';
//     next();
// });

// //middleware 2
// app.use(function(req,res,next){
//     // console.log("it is MW2");
//     // console.log("My name is MW2: ",req.myname);
//     next();
// });

var conatct_list = [
    {
        name:"Yash",
        phone: "9970344839"
    },
    {
        name:"Nikita",
        phone:"9850607811"
    },
    {
        name:"Kiran",
        phone:"1234567890"
    }
]

// fetching contact using async/ await method.
app.get('/',async function(req,res){
    // res.send("Cool! My Server is running.");
    // console.log("get controller:", req.myname);

    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "My Contact List",
            contact: contacts
        });
    } catch (err) {
        console.log("Error in fetching contacts from DB", err);
        return res.status(500).send('Error in fetching contacts from DB');
    }

    // return res.render('home', { 
    //     title: "My Contact List ",
    //     contact : conatct_list
    // });


});

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name," ",req.body.phone);
    
    // Add data into contact_list object
    // conatct_list.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // conatct_list.push(req.body);   // shorter way to add data into object
    // return res.redirect('/');

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // },function(err,newContact){
    //     if (err){console.log('error in creating a contact!'); 
    //     return;}

    //     console.log('***********',newContact);
    //     return res.redirect('back');
    // })

    //We create a new instance of the Contact model using new Contact({})
    const newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone
    });
    //We use the save method to save the new contact to the database.
    newContact.save()
        .then(newContact => {
            // console.log('***********', newContact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in creating a contact!', err);
            return res.status(500).send('Error in creating a contact');
        });
});

app.get('/practice', function(req,res){
    return res.render('practice',{
        title : "Play EJS"
    });
});


// for the deleting contact
app.get('/delete-contact/',function(req,res){

    // this is string param method
    // console.log(req.params)
    // let phone = req.params.phone;

    //this is query param method
    //get the id from query in the parameter
    let id = req.query.id;
    // using primises
    Contact.findByIdAndDelete(id)
        .then(() => {
        return res.redirect("back");
    })
    .catch(err => {
        console.log("Error occurring in deleting!", err);
        return res.status(500).send('Error in deleting contact');

    });

    // let contactIndex = conatct_list.findIndex(contact => contact.phone == phone); // getting the contact index in the list

    // if (contactIndex != -1){
    //     conatct_list.splice(contactIndex,1);
    // }

});

app.listen(port,function(err){
    if (err){
        console.log('Error in running the server', err);
    }

    console.log('Yup!, My Express Server running on port: ',port);
});
