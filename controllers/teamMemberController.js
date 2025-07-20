const TeamMember = require('../models/TeamMember');

exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const member = new TeamMember({ name, avatar });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 