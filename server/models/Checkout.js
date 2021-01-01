const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = mongoose.Schema({
    books: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    onlineUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;