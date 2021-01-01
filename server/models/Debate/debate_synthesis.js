const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebateSynthesisSchema = Schema({

    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    debate_article: {
        type: Schema.Types.ObjectId,
        ref: 'DebateArticle'
    },
    debate_thesis: {
        type: Schema.Types.ObjectId,
        ref: 'DebateThesis'
    },
    debate_antithesis: {
        type: Schema.Types.ObjectId,
        ref: 'DebateAntiThesis'
    },

    text: {
        type: String,
        required:true,

    },
    pdf: {
        type: String,
        required:true,

    },
    doc: {
        type: String,
        required:true,

    },
    pic: {
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



    
const DebateSynthesis = mongoose.model('DebateSynThesis', DebateSynthesisSchema);

module.exports = DebateSynthesis;
