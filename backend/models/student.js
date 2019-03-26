const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Student schema
 */
const StudentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    phones: { type: [Object], required: true }
});

/**
 * Export the Student schema
 * @type {Model}
 */
module.exports = mongoose.model('Student', StudentSchema);

