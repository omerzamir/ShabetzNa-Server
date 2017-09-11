var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constraintSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
    date: {
        type: Schema.Types.Date,
        default: () => +new Date + 30*24*60*60*1000
    }
});

var Constraint = mongoose.model('Constraint', constraintSchema);

module.exports = Constraint;