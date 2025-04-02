// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const ContactSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     mobile: {
//         type: String,
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const ContactModel = mongoose.model('contacts', ContactSchema);
// module.exports = ContactModel;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ContactModel = mongoose.model('contacts', ContactSchema);
module.exports = ContactModel;
