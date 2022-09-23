const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', { 
    name: { 
        type: String,
        required: true
    }, 
    email: { 
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        validate(value) { 
            if(!validator.isEmail(value)) { 
                throw new Error('Email is invalid')
            }
        }
    },
    password: { 
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        minLength: 7,
        validate(value) { 
            if(value.toLowerCase().includes('password')) { 
                throw new Error('Password must not contain password literal')
            }
        }
    },
    age: { 
        type: Number,
        default: 0,
        validate(value) { 
            if(value < 0) { 
                throw new Error('Age must be a positive number')
            }
        }
    }
})

module.exports = User