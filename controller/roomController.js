const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const roomCollection = dbConnect().db('HallManagement').collection('rooms');

const getRooms = async (req, res) => {
  const query = {};
  const cursor = roomCollection.find(query);
  const rooms = await cursor.toArray();
  res.send(rooms);
};

const addStudent = async (req, res) => {
  try {
    const { room, hall, ids } = req.body;
    let roomToUpdate = await roomCollection.findOne({ room, hall });
    const existingStudentCount = roomToUpdate.ids.length;
    // console.log(existingStudentCount);

    if (existingStudentCount === 4) {
      return res
        .status(400)
        .send('Adding these IDs will exceed the limit of 4 students per room.');
    }
    const intId = ids.map((id) => parseInt(id, 10));

    roomToUpdate.ids.push(...intId);
    await roomCollection.updateOne(
      { room, hall },
      { $set: { ids: roomToUpdate.ids } },
      { upsert: true }
    );

    res.status(200).send('IDs added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding IDs');
  }
};

module.exports = {
  getRooms,
  addStudent,
};
