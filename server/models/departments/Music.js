const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = Schema({

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



    
const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
