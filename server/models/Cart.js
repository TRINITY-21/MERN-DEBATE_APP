const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema({
    books: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    onlineUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

const Cart= mongoose.model("Cart", cartSchema);

module.exports = Cart;