const mongoose = require('mongoose');
const fs = require('fs').promises;
const User = require('../models/User'); 
const start = require("../db");
start();
async function readSampleData() {
  try {
    // Read the JSON file with sample data
    const jsonData = await fs.readFile('scripts/heliverse_mock_data.json', 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading sample data from JSON file:', error);
    throw error;
  }
}

async function insertSampleData() {
  try {
    const sampleUserData = await readSampleData();

    await User.insertMany(sampleUserData);
    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertSampleData();
