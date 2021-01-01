const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {
        type: String,
        required:true,

    },
    description: {
        type: String,

    }, 
    
    filePath: {
        type: String,

    }, 
   
    category: {
        type: String,

    },

    author: {
        type: String,

    },
    
    ISBN: {
        type: String,

    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    views: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0,

    },
    contactNumber: {
        type: Number,
        
    },
},
 { timestamps: true });

bookSchema.index({
    title:"text",
    description:"text"
}, 
   {
        weight:{
            name:5,
            description:1
    },
   }
);
    
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
