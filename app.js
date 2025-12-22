const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const MONGO_URL= 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Made during show rtoute
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  //This line tells your **Express.js app to use the **method-override middleware so that it can convert POST requests into PUT or DELETE requests using a special query parameter called _method.
app.engine('ejs', ejsMate); //This line sets up EJS Mate as the templating engine for your Express.js application. EJS Mate allows you to use advanced features like layouts and partials in your EJS templates.
app.use(express.static(path.join(__dirname, 'public'))); //This line serves static files (like CSS, images, and JavaScript) from the public directory in your project.


app.get('/', (req, res) => {
    res.send('Hey! I am root!');
});

app.get("/listings",async (req, res) =>{
   const allListings= await Listing.find({});
   res.render("listings/index", {allListings: allListings});
    });

    //New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});


    //Show route

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);//Pass this in show.ejs
    res.render("listings/show", {listing}) 
});   // Data is fetched from MongoDB, passed to the EJS template using res.render, and displayed using listing.property inside <%= %>.


//IMP IF WE MAKE CHANGES IN THE DATABSE THAT ROUTE IS MADE BY ASYNC FUNCTIONS--SHORT TRICK
//CREATE ROUTE
app.post("/listings", async (req, res) => {
    let{title, description, image, price, location, country} = req.body;
    const newListing = new Listing({
        title,
        description,
        image,
        price,
        location,
        country,
    });
    
    await newListing.save();
    res.redirect("/listings");
    console.log(newListing);
});

//EDIT Route---This will not have async keyword because we are mot making the changes in the database here
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("listings/edit", {listing});
});

//Update route
app.put("/listings/:id", async (req, res) => {
  let {id} = req.params;
   await Listing.findByIdAndUpdate(id, req.body ,{runValidators:true, new:true});
    res.redirect("/listings");
});
    
//DELETE ROUTE

app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});



app.get("/testListing", async (req, res) => {
    let samplelisting = new Listing({
        title: "My New Villa",
        description: "A nice place to stay",
        image: " ",
        price:1200,
        location: "Goa",
        country:"India",
    });
    //new Listing() means you are preparing to store a new record in the database using Mongoose.
    //This creates a new object (document) using the Listing Mongoose model.The above code i am talking about

    await samplelisting.save();
    //This saves the new listing into the MongoDB database using MongoDB.

    //await ensures:
    //The server waits until the data is fully saved before moving to the next line.
    console.log("Sample was saved");
    res.send("Succesfully saved the sample listing");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});