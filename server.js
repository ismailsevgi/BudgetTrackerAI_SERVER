const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const app = express();
// const connectMongo = require('./connectMongoDb');

app.use(cors());

app.get('/', async (req, res) => {
  //plan: (token, username, year)

  console.log(req);

  try {
    const connection = await mongoose.connect(
      'mongodb://127.0.0.1:27017/BudgetTrackerAI_Test',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    if (connection) {
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

      const user = await User.aggregate(yearAggregation);

      res.send(user);
    } else {
      throw new Error('Couldnt connect to mongo');
    }
  } catch (error) {
    console.log(error.message);
    res.send({ test: 'error', ...error });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
