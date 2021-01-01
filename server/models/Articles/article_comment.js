const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleCommentSchema = Schema({

    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comment: {
        type: String,
        required:true,

    },
    
    
},
 { timestamps: true });



    
const ArticleComment = mongoose.model('ArticleComment', ArticleCommentSchema);

module.exports = ArticleComment;
