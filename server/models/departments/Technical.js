const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechnicalSchema = Schema({

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



    
const Technical = mongoose.model('Technical', TechnicalSchema);

module.exports = Technical;
