const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotesSchema = Schema({
    quote: {
        type: String,
        required:true,

    },
    writer: {
        type: String,

    }, 
    
    filePath: {
        type: String,

    }, 
   
    position: {
        type: String,

    },

},
 { timestamps: true });



    
const Quote = mongoose.model('Quote', QuotesSchema);

module.exports = Quote;
