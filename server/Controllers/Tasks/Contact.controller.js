
// const ContactModel = require('../../Models/Tasks/Contact.model');

// const submitContactForm = async (req, res) => {
//     try {
//         const { name, mobile, message } = req.body;
//         const contact = new ContactModel({ name, mobile, message });
//         await contact.save();
//         res.status(201).json({ success: true, message: 'Message sent successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// module.exports = {
//     submitContactForm,
// };


const ContactModel = require('../../Models/Tasks/Contact.model');

const submitContactForm = async (req, res) => {
    try {
        const { name, mobile, message } = req.body;
        const contact = new ContactModel({ name, mobile, message });
        await contact.save();
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getQueries = async (req, res) => {
    try {
        const queries = await ContactModel.find();
        res.status(200).json({ success: true, data: queries });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateQueryStatus = async (req, res) => {
    try {
        const query = await ContactModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!query) {
            return res.status(404).json({ success: false, message: 'Query not found' });
        }
        res.status(200).json({ success: true, data: query });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteQuery = async (req, res) => {
    try {
        const query = await ContactModel.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(404).json({ success: false, message: 'Query not found' });
        }
        res.status(200).json({ success: true, message: 'Query deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    submitContactForm,
    getQueries,
    updateQueryStatus,
    deleteQuery
};
