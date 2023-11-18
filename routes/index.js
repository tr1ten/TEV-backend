var express = require('express');
var router = express.Router();
const User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res, next) {
   return res.send('Hello, World!');
});

router.get('/domains', async (req, res) => {
  try {
    const uniqueDomains = await User.distinct('domain');
    res.json({ domains: uniqueDomains  });
  } catch (error) {
    console.error('Error retrieving unique domains:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/genders', async (req, res) => {
  try {
    const uniqueGenders = await User.distinct('gender');
    res.json({ genders: uniqueGenders });
  } catch (error) {
    console.error('Error retrieving unique genders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
