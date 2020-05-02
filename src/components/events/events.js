import moment from 'moment';

export const events = {
  event: [
    {
      start: moment(),
      end: moment()
        .add(1, 'days')
        .startOf('day'),
      title: 'Some title',
      allDay: true,
      resource: [],
    },
    {
      title: 'some event',
      start: moment().add(-5, 'day').startOf('day'),
      end: moment().add(-5, 'day').startOf('day'),
      allDay: true,
      resource: [],
    },
  ],
};
