require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const hallsRoute = require('./Routes/hallsRoute');
const studentsRoute = require('./Routes/studentsRoute');
const usersRoute = require('./Routes/usersRoute');
const applicationRoute = require('./Routes/applicationRoute');
const noticeRoute = require('./Routes/noticeRoute');
const administrationRoute = require('./Routes/administrationRoute');
const roomAllocationRoute = require('./Routes/roomAllocationRoute');

// middleware
app.use(express.json());

// api's
app.use('/api/halls', hallsRoute);
app.use('/api/stutents', studentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/appllication', applicationRoute);
app.use('/api/notice', noticeRoute);
app.use('/api/administration', administrationRoute);
app.use('/api/rooms/', roomAllocationRoute);

app.get('/', (req, res) => {
  res.send('Hall Management server is running...');
});

app.listen(port, () => {
  console.log(`Hall Management server is running on ${port}`);
});
