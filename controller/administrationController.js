const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const administrationCollection = dbConnect()
  .db('HallManagement')
  .collection('administration');

const getAdministrations = async (req, res) => {
  const query = {};
  const cursor = administrationCollection.find(query);
  const administrations = await cursor.toArray();
  res.send(administrations);
};
const addAdministration = async (req, res) => {
    // console.log(req.body)
  const query = req.body;
  try {
    const result = await administrationCollection.insertOne(query);
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

module.exports = {
  getAdministrations,
  addAdministration,
  //   updateadministration,
  //   getUseradministration,
};
