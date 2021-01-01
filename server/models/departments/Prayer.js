const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrayerSchema = Schema({

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



    
const Prayer = mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;
