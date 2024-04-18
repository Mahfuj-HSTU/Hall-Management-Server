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
  const type = data.type;
  try {
    let existingNotice;

    if (type === 'HallSeat') {
      // If type is 'HallSeat', try to find an existing notice
      existingNotice = await noticeCollection.findOneAndUpdate(
        { type },
        { $set: data },
        {
          upsert: true, // Insert if not found
          returnOriginal: false, // Return the updated or inserted document
        }
      );
    } else {
      // If type is not 'HallSeat', directly insert a new notice
      existingNotice = await noticeCollection.insertOne(data);
    }

    res.status(200).send(existingNotice);
  } catch (error) {
    console.error('Error adding notice:', error);
    res.status(500).send('Error adding notice');
  }
};

module.exports = {
  getNotice,
  addNotice,
};
