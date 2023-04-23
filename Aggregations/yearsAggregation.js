module.exports = {
  allYears: [
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
  ],

  byYear: (year) => {
    return [
      {
        $match: { username: 'ismail' },
      },
      {
        $project: {
          _id: 0,
          username: true,
          password: true,
          data: { $objectToArray: '$data' },
          cards: true,
        },
      },
      {
        $project: {
          username: true,
          password: true,
          data: {
            $filter: {
              input: '$data',
              as: 'item',
              cond: { $eq: ['$$item.k', year] },
            },
          },
          cards: true,
        },
      },
      {
        $project: {
          username: true,
          password: true,
          data: { $arrayElemAt: ['$data.v', 0] },
          cards: true,
        },
      },
    ];
  },
};
