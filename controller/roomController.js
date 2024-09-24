const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const roomCollection = dbConnect().db('HallManagement').collection('rooms');

const getRooms = async (req, res) => {
  const query = {};
  const cursor = roomCollection.find(query);
  const rooms = await cursor.toArray();
  res.send(rooms);
};

const addRoom = async (req, res) => {
  const { hall, room } = req.body;

  // Check if the room already exists in the same hall
  const existingRoom = await roomCollection.findOne({ hall, room });

  if (existingRoom) {
    // If a room with the same number already exists in the same hall, return an error
    return res
      .status(400)
      .send({ message: 'Room already exists in this hall' });
  }

  // If the room is unique within the hall, insert the new room
  const result = await roomCollection.insertOne(req.body);

  res.send(result);
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

const removeStudent = async (req, res) => {
  try {
    const { room, hall, id } = req.body;

    // Find the room and hall combination
    let roomToUpdate = await roomCollection.findOne({ room, hall });
    if (!roomToUpdate) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    // Ensure both `id` and `ids` array elements are strings for comparison
    const targetId = id.toString().trim();

    // Use findIndex to locate the ID, ignoring type differences
    const indexNo = roomToUpdate.ids.findIndex(
      (storedId) => storedId.toString().trim() === targetId
    );
    // console.log('Index of ID:', indexNo);

    if (indexNo !== -1) {
      // Remove the student id from the array
      roomToUpdate.ids.splice(indexNo, 1);
    } else {
      return res.status(404).json({ error: 'ID not found in the room.' });
    }

    // Update the room document in the collection
    const result = await roomCollection.updateOne(
      { room, hall },
      { $set: { ids: roomToUpdate.ids } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ error: 'Failed to update room.' });
    }

    // Send a success response
    res.status(200).json({ message: 'ID removed successfully', roomToUpdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error removing ID' });
  }
};

module.exports = {
  getRooms,
  addStudent,
  removeStudent,
  addRoom,
};
