const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model('User', userSchema);
