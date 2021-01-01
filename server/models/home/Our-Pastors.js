const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PastorsSchema = Schema({
    name: {
        type: String,
        required:true,

    },
    position: {
        type: String,

    }, 
    
    filePath: {
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



    
const Pastors = mongoose.model('Pastors', PastorsSchema);

module.exports = Pastors;
