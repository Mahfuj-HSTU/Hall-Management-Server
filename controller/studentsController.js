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
  console.log(id);
  const query = { sid: id };
  const student = await studentCollection.findOne(query);
  res.send(student);
};

module.exports = { getStudents, getStudentDetails };
