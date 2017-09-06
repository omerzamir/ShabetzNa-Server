var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: Schema.Types.String,
    name: Schema.Types.String,
    userspermissions: [Schema.Types.String],
    specialpermissions: [Schema.Types.Number],
    exemptions: [{
        exempt: {
            type: Schema.Types.ObjectId, 
            ref:'MissionType'
        },
        description: String
    }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
