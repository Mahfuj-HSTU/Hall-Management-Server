const dbConnect = require('../Utilities/dbConnect');

const studentCollection = dbConnect()
  .db('HallManagement')
  .collection('students');

const getStudents = async (req, res) => {
  const query = {};
  const students = await studentCollection.find(query).toArray();
  res.send(students);
};

module.exports = { getStudents };
