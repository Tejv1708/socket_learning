import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please tell us your name !' ],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [ validator.isEmail, 'Please Provide the valid email' ],
    },
    password: {
        type: String,
        required: [ true, 'Please Provide a password' ],
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [ true, 'Please confirm your password ' ],
        validate: {
            // This only work on CREATE AND  SAVE !!!
            validator: function ( el ) {
                return el === this.password;
            },
            message: 'Password are not the same',
        },
    },
} )