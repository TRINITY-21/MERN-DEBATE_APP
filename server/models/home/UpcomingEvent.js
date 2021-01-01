const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpcomingEventSchema = Schema({
    title: {
        type: String,
        required:true,

    },
    description: {
        type: String,

    }, 
    
    filePath: {
        type: String,

    }, 
   
    date: {
        type: Date,

    },

},
 { timestamps: true });



    
const UpcomingEvent = mongoose.model('UpcomingEvent', UpcomingEventSchema);

module.exports = UpcomingEvent;
