var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionTypeSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        default: ""
    },
    type: {
        type:Schema.Types.Number,
        required: true
    }
});

var MissionType = mongoose.model('MissionType', missionTypeSchema);

module.exports = MissionType;
