const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalitySchema = Schema({
    name: {
        type: String,
        required:true,

    },
    description: {
        type: String,

    }, 
    
    filePath: {
        type: String,

    }, 
   
    program: {
        type: String,

    },

    level: {
        type: String,

    },
    
    skills: {
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



    
const Personality = mongoose.model('Personality', personalitySchema);

module.exports = Personality;
