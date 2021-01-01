const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BibleStudiesSchema = Schema({

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



    
const BibleStudies = mongoose.model('BibleStudies', BibleStudiesSchema);

module.exports = BibleStudies;
