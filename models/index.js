const mongoose = require('mongoose');

pasteSchema = new mongoose.Schema({
    raw: String,
    title: String,
    url: String});
module.exports = mongoose.model('Paste', pasteSchema);