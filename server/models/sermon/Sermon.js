const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SermonSchema = Schema({
    author: {
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

    title: {
        type: String,

    },

    fileDuration: {
        type: String,
        
    },
    date: {
            type:Date,
        
    }
},
 { timestamps: true });



    
const Sermon = mongoose.model('Sermon', SermonSchema);

module.exports = Sermon;
