const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = mongoose.Schema({
   onlineUser: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },

   bookId: {
       type: Schema.Types.ObjectId,
       ref:"Book"
    }
 
}, { timestamps: true })


const Likes = mongoose.model('Likes', likesSchema);

module.exports = { Likes }
