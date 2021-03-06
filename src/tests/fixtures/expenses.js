import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    created: 0,
  },

  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    created: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4095,
    created: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
];

export default expenses;
