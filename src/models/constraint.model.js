var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constraintSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
    startDate: {
        type: Schema.Types.Date,
        default: () => +new Date + 30*24*60*60*1000
    },
    endDate: {
        type: Schema.Types.Date,
        default: () => +new Date + 30*24*60*60*1000
    }
});

var Constraint = mongoose.model('MissionType', constraintSchema);

module.exports = Constraint;