const { ObjectId } = require('mongodb');
const dbConnect = require('../Utilities/dbConnect');

const applicationCollection = dbConnect()
  .db('HallManagement')
  .collection('applications');

const getApplications = async (req, res) => {
  const query = {};
  const cursor = applicationCollection.find(query);
  const applications = await cursor.toArray();
  res.send(applications);
};

const addApplication = async (req, res) => {
  try {
    const data = req.body;
    const sid = data.sid;
    const type = data?.type;
    const currentDate = new Date();
    delete data?._id;
    // console.log(data);

    const existingApplications = await applicationCollection
      .find({ sid })
      .toArray();
    console.log(data);

    const [firstApplication, secondApplication] = existingApplications;
    if (existingApplications.length === 2) {
      if (type === firstApplication.type) {
        // Update the first application
        const filter = { _id: firstApplication._id };
        const updateDoc = { $set: { ...data, date: currentDate } };
        await applicationCollection.updateOne(filter, updateDoc);
        return res.json({ message: 'Application updated.' });
      } else if (type === secondApplication.type) {
        // Update the second application
        const filter = { _id: secondApplication._id };
        const updateDoc = { $set: { ...data, date: currentDate } };
        await applicationCollection.updateOne(filter, updateDoc);
        return res.json({ message: 'Application updated.' });
      } else {
        return res.status(400).json({
          error:
            'Cannot update application. New type does not match existing types.',
        });
      }
    } else if (
      type === firstApplication?.type ||
      type === secondApplication?.type
    ) {
      // Update the second application
      const filter = { _id: firstApplication?._id || secondApplication?._id };
      // console.log(filter);
      const updateDoc = { $set: { ...data, date: currentDate } };
      await applicationCollection.updateOne(filter, updateDoc);
      return res.json({ message: 'Application updated.' });
    } else {
      const result = await applicationCollection.insertOne({
        ...data,
        date: currentDate,
      });
      return res.send(result);
    }
  } catch (error) {
    console.error('Error adding application:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getApplications,
  addApplication,
};
