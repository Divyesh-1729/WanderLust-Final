const express = require("express");
const router = express.Router({ mergeParams: true }); //To access :id from listings route
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');
const review = require("../models/review.js");
const { createReview } = require("../controllers/reviews.js");
const reviewController = require("../controllers/reviews.js"); //Importing review controller to keep the routes file clean and organized

//Validation middleware for reviews




//Reviews Route Post route

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//Review Delete Route 

router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
