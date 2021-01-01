const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = Schema({

    description: {
        type: String,

    }, 
    
    filePath: {
        type: String,


    }, 
   
    thumbsFilePath: {
        type: String,
        required:true

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



    
const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
