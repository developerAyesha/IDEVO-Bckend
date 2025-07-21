const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema); 