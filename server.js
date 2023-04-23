const express = require('express');
const cors = require('cors');

const User = require('./models/userModel');
const app = express();
const connectingMongoDB = require('./connectMongoDb');

const yearsAggregation = require('./Aggregations/yearsAggregation');
// const connectMongo = require('./connectMongoDb');

//Connect mongodb
connectingMongoDB();

app.use(cors());
app.use(express.json());

app.use('/', async (req, res) => {
  //plan: (token, username, year)
  let user;

  try {
    if (req.method === 'POST') {
      console.log('POST GELDİ');
      console.log(req.body);
      user = await User.aggregate(yearsAggregation.byYear(req.body.year));
    }

    if (req.method === 'GET') {
      console.log('GET GELDİ');
      user = await User.aggregate(yearsAggregation.allYears);
    }

    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send({ test: 'error', ...error });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
