const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    Type: {
        type: String,
        default: Date.now
    }

})
module.exports = mongoose.model('attendance', attendanceSchema)