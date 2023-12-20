const mongos = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongos.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F'],
        trim: true,
        minLength: 1,
        maxLength: 1,
        uppercase: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date:{
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        required: true,
        enum: ['Fan', 'Admin', 'Referee'],
        default: 'Fan',
        trim: true,
    },
    status:{
        type: String,
        required: true,
        enum: ['Approved', 'Pending', 'Rejected'],
        trim: true,
    },
    matches:{
        type: [mongos.Schema.Types.ObjectId],
        required: true,
        default: []
    },
});

// pre save hook to hash the password
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// method to compare the password
userSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password);
};


module.exports = mongos.model('User', userSchema);