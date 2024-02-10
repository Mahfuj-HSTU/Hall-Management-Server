const { query } = require('express');
const dbConnect = require('../Utilities/dbConnect');
const { ObjectId } = require('mongodb');

const userCollection = dbConnect().db('HallManagement').collection('users');
const studentCollection = dbConnect()
  .db('HallManagement')
  .collection('students');

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

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const query = { sid: id };
  // console.log(query);
  try {
    // Delete user from usersCollection
    const userDelete = await userCollection.deleteOne(query);

    // Delete user from studentCollection
    const studentDelete = await studentCollection.deleteMany(query);

    if (userDelete.deletedCount === 1 && studentDelete.deletedCount >= 1) {
      res
        .status(200)
        .send({ message: 'User deleted successfully from both collections.' });
    } else {
      res.status(404).send({
        message:
          'User not found or could not be deleted from both collections may be delte from one collection',
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user.', error: error });
  }
};

// app.delete('/users/:id', async (req, res) => {
//   const id = req.params.id;
//   const userIdQuery = { _id: ObjectID(id) };
//   const studentIdQuery = { userId: id }; // Assuming there's a field named 'userId' in the studentCollection referencing the user's ID

//   try {
//     // Delete user from usersCollection
//     const userDeletionResult = await usersCollection.deleteOne(userIdQuery);

//     // Delete user from studentCollection
//     const studentDeletionResult = await studentCollection.deleteMany(
//       studentIdQuery
//     );

//     if (
//       userDeletionResult.deletedCount === 1 &&
//       studentDeletionResult.deletedCount >= 1
//     ) {
//       res
//         .status(200)
//         .send({ message: 'User deleted successfully from both collections.' });
//     } else {
//       res.status(404).send({
//         message:
//           'User not found or could not be deleted from both collections.',
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ message: 'Error deleting user.', error: error });
//   }
// });

module.exports = { getUsers, postUsers, getUser, deleteUser };
