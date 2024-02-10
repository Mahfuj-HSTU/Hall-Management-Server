const dbConnect = require('../Utilities/dbConnect');

const studentCollection = dbConnect()
  .db('HallManagement')
  .collection('students');

const getStudents = async (req, res) => {
  const query = {};
  const students = await studentCollection.find(query).toArray();
  res.send(students);
};

const getStudentDetails = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const query = { sid: id };
  const student = await studentCollection.findOne(query);
  res.send(student);
};

const addStudent = async (req, res) => {
  const query = req.body;
  try {
    await studentCollection.createIndex({ sid: 1 }, { unique: true });
    const result = await studentCollection.insertOne(query);
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

module.exports = { getStudents, getStudentDetails, addStudent };
