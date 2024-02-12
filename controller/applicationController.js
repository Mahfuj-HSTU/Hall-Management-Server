const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const applicationCollection = dbConnect()
  .db('HallManagement')
  .collection('applications');

const getApplications = async (req, res) => {
  const query = {};
  const cursor = applicationCollection.find(query);
  const applications = await cursor.toArray();
  res.send(applications);
};
const addApplication = async (req, res) => {
  const query = req.body;
  try {
    await applicationCollection.createIndex({ sid: 1 }, { unique: true });
    const result = await applicationCollection.insertOne(query);
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
// const getHallDetails = async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const hall = await hallCollection.findOne(query);
//   res.send(hall);
// };

module.exports = {
  getApplications,
  addApplication,
  //   getHalls,
  //   getHallDetails,
};
