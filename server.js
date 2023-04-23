const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const app = express();
const connectingMongoDB = require('./connectMongoDb');

const yearsAggregation = require('./Aggregations/yearsAggregation');
// const connectMongo = require('./connectMongoDb');

//Connect mongodb
connectingMongoDB();

app.use(cors());

app.get('/', async (req, res) => {
  //plan: (token, username, year)

  console.log(req);

  try {
    const yearAggregation = [
      {
        $match: { username: 'ismail' },
      },
      {
        $project: {
          _id: 0,
          username: true,
          password: true,
          data: true,
          cards: true,
          years: {
            $map: {
              input: { $objectToArray: '$data' },
              as: 'year',
              in: '$$year.k',
            },
          },
        },
      },
    ];

    const user = await User.aggregate(yearsAggregation);

    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send({ test: 'error', ...error });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
