var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: Schema.Types.String,
    name: Schema.Types.String,
    userspermissions: [Schema.Types.String],
    pagespermissions: [Schema.Types.Number],
    exemptions: [{
        type: Schema.Types.ObjectId, 
        ref:'MissionType'
    }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
