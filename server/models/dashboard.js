mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dashboardSchema = mongoose.Schema({
    
   
    onlineUser: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
   
}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard',  dashboardSchema );

module.exports =  Dashboard