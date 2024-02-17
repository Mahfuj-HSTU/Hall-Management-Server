const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const noticeCollection = dbConnect().db('HallManagement').collection('notices');

const getNotice = async (req, res) => {
  const query = {};
  const cursor = noticeCollection.find(query);
  const notices = await cursor.toArray();
  res.send(notices);
};
const addNotice = async (req, res) => {
  const data = req.body;
  const notice = await noticeCollection.insertOne(data);
  res.send(notice);
};

module.exports = {
  getNotice,
  addNotice,
};
