const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path based on your file structure

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, domain, gender, available, search } = req.query;
    const query = {};

    if (domain) {
      query.domain = domain;
    }

    if (gender) {
      query.gender = gender;
    }
    console.log(available, typeof available, available != 'false');
    if (available) {
      query.available = available != 'false';
    }

    if (search) {
      query.$or = [
        { first_name: new RegExp(search, 'i') },
        { last_name: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.find(
      { id: req.params.id },
      { __v: 0 }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating a new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/users/:id: Update an existing user.
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
       {
        id: req.params.id,
       },
        req.body,
        {
          new: true,
          runValidators: true,
        }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/users/:id: Delete a user.
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
