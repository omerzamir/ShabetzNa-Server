var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionTypeSchema = new Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    type: Schema.Types.Number
});

var MissionType = mongoose.model('MissionType', missionTypeSchema);

module.exports = MissionType;
