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
    role:{
        type: String,
        required: true,
        default: 'Fan',
        trim: true,
    },
    status:{
        type: String,
        required: true,
    },
    verificationToken: String,
    isVerified: {
    type: Boolean,
    default: false,
        },
    verified: Date,
    passwordToken: {
    type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
    seat: {
        column: {
            type: Number,
            min: 1,
            max: 99999
        },
        row: {
            type: Number,
            min: 1,
            max: 99999
        },
    },
    matches: {
        type: [mongos.Schema.Types.ObjectId],
        default: []
    }
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