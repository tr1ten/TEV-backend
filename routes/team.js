const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Team = require('../models/Team'); 

router.post('/', async (req, res) => {
  try {
    const { users, team_name } = req.body;
    // map string id to Number
    const selectedUsers = await User.find({ id: { $in: users.map(Number) } });

    const uniqueDomains = new Set(selectedUsers.map(user => user.domain)); // since each domain must be unique ie each user must belong to a different domain
    // each user must be available ie true
    const availabilities = selectedUsers.map(user => user.available);
    // console.log(uniqueDomains, availabilities);
    if (uniqueDomains.size !== selectedUsers.length || !availabilities.every(Boolean)) {
      return res.status(400).json({ error: 'Selected users must have unique domains and should be availability' });
    }

    const newTeam = await Team.create({ team_name });
    // add member one by one
    for (let user of selectedUsers) {
      newTeam.members.push(user);
    }
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating a new team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'first_name last_name email');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error('Error retrieving team by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
