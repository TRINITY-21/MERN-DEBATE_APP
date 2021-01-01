const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responsesSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    leaders_vision: {
        type: Schema.Types.ObjectId,
        ref: 'LeadersVision',
        required:true
    },
    critique: {
        type: Schema.Types.ObjectId,
        ref: 'ThinkersCritique',
        required:true
    },
    name: {
        type: String,
        required:true,

    },
    image: {
        type: String,

    }, 

    issue_area: {
        type: String,
        
    },
    
    heading: {
        type: String,
        required:true,

    }, 
   
    summary: {
        type: String,
        

    },

    age: {
        type: String,

    },    pdf: {
        type: String,

    }, 
   
    doc: {
        type: String,

    },

    video: {
        type: String,

    },    gender: {
        type: String,

    },

    pics: {
        type: String,

    },
    approved: {
        type: Boolean,
        default:false
    }

   
},
 { timestamps: true });



    
const EnterpreneurResponse = mongoose.model('EnterpreneurResponse', responsesSchema);

module.exports = EnterpreneurResponse;
