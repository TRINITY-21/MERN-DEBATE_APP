const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicitySchema = Schema({

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
   
    thumbsFilePath: {
        type: String,

    },

    fileDuration: {
        type: String,

    },
    
    date: {
        type: Date,

    }

   
},
 { timestamps: true });



    
const Publicity = mongoose.model('Publicity', PublicitySchema);

module.exports = Publicity;
