require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  CURSOR_FLAGS,
} = require('mongodb');

// middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdoqsyi.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const hallCollection = client.db('HallManagement').collection('halls');
    const studentCollection = client
      .db('HallManagement')
      .collection('students');

    // get halls
    app.get('/halls', async (req, res) => {
      const query = {};
      const cursor = hallCollection.find(query);
      const halls = await cursor.toArray();
      res.send(halls);
    });

    // get hall detail
    app.get('/hall/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const hall = await hallCollection.findOne(query);
      res.send(hall);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hall Management server is running...');
});

app.listen(port, () => {
  console.log(`Hall Management server is running on ${port}`);
});
