const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaders_visionsSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required:true,

    },
    filePath: {
        type: String,

    }, 

    issue_area: {
        type: Array,
        
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

    },
    pdf: {
        type: String,

    },
    view_counts: {
        type: Number,
        default : 0

    }, 
   
    doc: {
        type: String,

    },

    video: {
        type: String,

    },

    gender: {
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



    
const LeadersVision = mongoose.model('LeadersVision', leaders_visionsSchema);

module.exports = LeadersVision;
