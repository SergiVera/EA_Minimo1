const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Subject schema, containing the student id
 */
const SubjectSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    student: { type: [mongoose.Schema.Types.ObjectId], ref: 'Student' }
});

/**
 * Export the Subject schema
 * @type {Model}
 */
module.exports = mongoose.model('Subject', SubjectSchema);
