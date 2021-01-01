const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutUsSchema = Schema({

    name: {
        type: String,
        required:true,

    },
    email: {
        type: String,

    }, 
    
    subject: {
        type: String,

    }, 
   
    message: {
        type: String,

    },

   
},
 { timestamps: true });



    
const AboutUs = mongoose.model('AboutUs', AboutUsSchema);

module.exports = AboutUs;
