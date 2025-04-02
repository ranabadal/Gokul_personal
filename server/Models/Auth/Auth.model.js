// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url)
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//         console.log('Error connecting to MongoDB', err);
//     });

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     number: {
//         type: String,
//         required: true
//     },
//     profilePic: {
//         type: String,
//          default: ''
//     },
//     resetPasswordToken: {
//         type: String,
//         required: false
//     },
//     resetPasswordExpires: {
//         type: Date,
//         required: false
//     }
// });

// const UserModel = mongoose.model('users', UserSchema);
// module.exports = UserModel;



const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // Make password field optional
    },
    number: {
        type: String,
        required: false // Make number field optional
    },
    profilePic: {
        type: String,
         default: ''
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    googleSignup: {
        type: Boolean,
        default: false
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;