var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionTypeSchema = new Schema({
    name: {
        type: Schema.Types.String,
        default: ""
    },
    description: {
        type: Schema.Types.String,
        default: ""
    },
    type: {
        type:Schema.Types.Number,
        default: 0
    }
});

var MissionType = mongoose.model('MissionType', missionTypeSchema);

module.exports = MissionType;
