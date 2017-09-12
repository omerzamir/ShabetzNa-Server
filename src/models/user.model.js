var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        default: ""
    },
    name: {
        type: Schema.Types.String,
        default: ""
    },
    userspermissions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }], default: []
    },
    specialpermissions: {
        type: [Schema.Types.Number],
        default:[]
    },
    exemptions: {
        type: [{
            exempt: {
                type: Schema.Types.ObjectId,
                ref: 'MissionType'
            },
            description: String
        }],
        default: []
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;