import Mongoose from 'mongoose'
const chalk = require('chalk')
const bcrypt = require('bcrypt')

const { Schema } = Mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function () {
    try {
        this.password = await bcrypt.hash(this.password, 12)
        console.log(`${chalk.bgBlue('Password bcrypt is done!')}`)
    } catch (error) {
        console.log(`${chalk.bgGreen(error)}`)
    }

})

module.exports = Mongoose.model('User', UserSchema);