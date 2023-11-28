const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username must be unique!'],
        required: [true, 'Username is required!']
    },
    password: {
        type: String,
        minlength: [8, 'Password must be of atleast 8 characters!'],
        required: [true, 'Password is required!']
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    friendRequestSent: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    friendRequestReceived: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId
    }]
});

// This function is called when new user account is being created
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// This one runs everytime user tries to login to the system
userSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error('Password is incorrect!')
        }
    }else{
        throw Error('Username is incorrect!')
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;