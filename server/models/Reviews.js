const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    onlineUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    
    content: {
        type: String
    }

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;