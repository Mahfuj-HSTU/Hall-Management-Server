const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  CURSOR_FLAGS,
} = require('mongodb');

function dbConnect() {
  // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdoqsyi.mongodb.net/?retryWrites=true&w=majority`;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p1fbs41.mongodb.net/?retryWrites=true&w=majority`;

  return (client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }));
}

module.exports = dbConnect;
