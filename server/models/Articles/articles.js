const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    topic: {
        type: String,
        required:true,

    },
    filePath: {
        type: String,

    }, 

    body: {
        type: String,
        
    },
    view_counts: {
        type: Number,
        default:0
        
    },
    

    approved: {
        type: Boolean,
        default:false
    }

   
},
 { timestamps: true });



    
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
