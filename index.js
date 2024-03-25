require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const hallsRoute = require('./Routes/hallsRoute');
const studentsRoute = require('./Routes/studentsRoute');
const usersRoute = require('./Routes/usersRoute');
const applicationRoute = require('./Routes/applicationRoute');
const noticeRoute = require('./Routes/noticeRoute');
const administrationRoute = require('./Routes/administrationRoute');
const roomAllocationRoute = require('./Routes/roomAllocationRoute');

// middleware
app.use(cors());
app.use(express.json());

// api's
app.use('/api/halls', hallsRoute);
app.use('/api/students', studentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/applications', applicationRoute);
app.use('/api/notice', noticeRoute);
app.use('/api/administration', administrationRoute);
app.use('/api/rooms', roomAllocationRoute);

// async function run() {
//   try {
//     const hallCollection = client.db('HallManagement').collection('halls');
//     const studentCollection = client
//       .db('HallManagement')
//       .collection('students');

//     // get halls
//     app.get('/halls', async (req, res) => {
//       const query = {};
//       const cursor = hallCollection.find(query);
//       const halls = await cursor.toArray();
//       res.send(halls);
//     });

//     // get hall detail
//     app.get('/hall/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const hall = await hallCollection.findOne(query);
//       res.send(hall);
//     });

//     // get students
//     app.get('/students', async (req, res) => {
//       const query = {};
//       const cursor = studentCollection.find(query);
//       const students = await cursor.toArray();
//       res.send(students);
//     });
//   } finally {
//   }
// }

// run().catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hall Management server is running...');
});

app.listen(port, () => {
  console.log(`Hall Management server is running on ${port}`);
});
