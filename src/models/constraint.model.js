var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constraintSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: true
    },
    date: {
        type: Schema.Types.Date,
        required: true
    }
});

var Constraint = mongoose.model('Constraint', constraintSchema);

module.exports = Constraint;