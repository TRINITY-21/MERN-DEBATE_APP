const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebateArticleSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    topic: {
        type: String,
        required:true,

    },
    body: {
        type: String,
        required:true,

    },
    filePath: {
        type: String,
        

    },
    view_counts: {
        type: Number,
        default:0,

    },
    approved: {
        type: Boolean,
        default:false,

    },
    
    
},
 { timestamps: true });



    
const DebateArticle = mongoose.model('DebateArticle', DebateArticleSchema);

module.exports = DebateArticle;
