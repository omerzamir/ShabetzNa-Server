var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
    type:{
        type: Schema.Types.ObjectId, 
        ref:'MissionType'
    },
    startDate: {
        type: Schema.Types.Date,
        default: () => +new Date + 30*24*60*60*1000
    },
    endDate: {
        type: Schema.Types.Date,
        default: () => +new Date + 30*24*60*60*1000
    },
    status: {
        type: Schema.Types.Number,
        default: 0
    },
    participents: {
        type: [{
            type: Schema.Types.ObjectId, 
            ref:'User'
        }],
        default: []
    }
});

var Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;