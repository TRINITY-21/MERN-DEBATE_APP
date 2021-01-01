const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExecutivesSchema = Schema({

    name: {
        type: String,
        required:true,

    },

    filePath: {
        type: String,

    }, 
   
    program: {
        type: String,

    },
    
    position: {
        type: String,

    },

    whatsApp: {
        type: Number,
        //default: 0
    },
    instagram: {
        type: String,
        // default: 0,

    },
    twitter: {
        type: String,
        
    },
        facebook: {
            type:String,
        
    }
},
 { timestamps: true });



    
const Executives = mongoose.model('Executives', ExecutivesSchema);

module.exports = Executives;
