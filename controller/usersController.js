const { query } = require('express');
const dbConnect = require('../Utilities/dbConnect');

const userCollection = dbConnect().db('HallManagement').collection('users');

const getUsers = async (req, res) => {
  const query = {};
  const users = await userCollection.find(query).toArray();
  res.send(users);
};

const postUsers = async (req, res) => {
  const user = req.body;

  try {
    await userCollection.createIndex({ sid: 1 }, { unique: true });
    const result = await userCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.sid) {
      return res
        .status(400)
        .json({ error: 'Duplicate SID. User with this SID already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUser = async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await userCollection.findOne(query);
  res.send(user);
};

module.exports = { getUsers, postUsers, getUser };
