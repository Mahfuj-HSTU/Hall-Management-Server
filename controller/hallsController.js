const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const hallCollection = dbConnect().db('HallManagement').collection('halls');

const getHalls = async (req, res) => {
  const query = {};
  const cursor = hallCollection.find(query);
  const halls = await cursor.toArray();
  res.send(halls);
};
const getHallDetails = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const hall = await hallCollection.findOne(query);
  res.send(hall);
};

module.exports = {
  getHalls,
  getHallDetails,
};
