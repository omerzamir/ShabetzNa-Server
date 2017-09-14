var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    job: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    usersPermissions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }], default: []
    },
    specialPermissions: {
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