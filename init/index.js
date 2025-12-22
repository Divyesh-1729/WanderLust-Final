const mongoose = require('mongoose');
const initData = require('../init/data.js');
const Listing = require('../models/listing.js');

const MONGO_URL= 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
//Placing semicolin as it is variable assignment

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    //This line clears all existing listings in the database to avoid duplicates.
    await Listing.insertMany(initData.data);
    //This line adds all the sample listings from init/data.js into the database.
    console.log("Data was initialised");
};

    initDB();
    //Check the mongosh to see that entire data from data.js has been added to the listings collection.


