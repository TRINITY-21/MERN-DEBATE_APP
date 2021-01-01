const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebateThesisSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    debate_article: {
        type: Schema.Types.ObjectId,
        ref: 'DebateArticle'
    },

    body: {
        type: String,
        required:true,

    },
    pdf: {
        type: String,
        

    },
    doc: {
        type: String,
       

    },
    filePath: {
        type: String,
        required:true,

    },
    video: {
        type: String,
        

    },
    approved: {
        type: Boolean,
        default:false,

    },
    
    
},
 { timestamps: true });



    
const DebateThesis = mongoose.model('DebateThesis', DebateThesisSchema);

module.exports = DebateThesis;
