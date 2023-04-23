module.exports = [
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
