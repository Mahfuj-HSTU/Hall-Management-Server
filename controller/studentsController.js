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

const updateStudent = async (req, res) => {
  try {
    const data = req.body;
    const sid = data.sid;
    const query = { sid: sid };

    const updatedStudent = await studentCollection.updateOne(query, {
      $set: data,
    });

    if (updatedStudent.modifiedCount === 1) {
      res.status(200).json({ message: 'Student updated successfully.' });
    } else {
      res
        .status(404)
        .json({ message: 'Student not found or no changes were made.' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const updateUser = router.put('/update-user', async (req, res) => {
//   try {
//     // const { id } = req.query;
//     const data = req.body;
//     const memberId = Number(data.memberId);

//     const query = { memberId: memberId };
//     // console.log(memberId);

//     const updateUser = await userSchema.findOneAndUpdate(query, data);
//     if (data.releaseStatus) {
//       const deletedBalance = await balanceSchema.deleteMany(query);
//       res.status(201).send({ updateUser, deletedBalance });
//     } else {
//       res.status(201).send(updateUser);
//     }
//     // console.log(data.releaseStatus);
//     // res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// });

module.exports = { getStudents, getStudentDetails, addStudent, updateStudent };
