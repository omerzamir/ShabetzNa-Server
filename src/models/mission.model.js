var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
    type:{
        type: Schema.Types.ObjectId, 
        ref:'MissionType',
        required: true
    },
    startDate: {
        type: Schema.Types.Date,
        required: true
    },
    endDate: {
        type: Schema.Types.Date,
        required: true
    },
    status: {
        type: Schema.Types.Number,
        default: 0,
        required: true
    },
    participents: {
        type: [{
            type: Schema.Types.ObjectId, 
            ref:'User'
        }],
        default: [],
        required: true
    }
});

var Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;