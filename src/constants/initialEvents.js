/* eslint-disable */
import moment from 'moment';

import { UIDv4 } from '../utils';

const initialEvents = [
  {
    id: UIDv4(),
    title: "Mama's Bithday",
    start: moment().add(1, 'days')._d,
    end: moment().add(1, 'days')._d,
    type: 'birthday',
    allDay: true,
    notes: 'Send flowers',
  },
  {
    id: UIDv4(),
    title: 'Check schedule',
    start: moment().startOf('hour')._d,
    end: moment().endOf('hour')._d,
    type: 'personal',
    notes: '💪 More gym 💪',
  },
  {
    id: UIDv4(),
    title: 'Drink water',
    start: moment().set({
      hour: 15,
      minute: 30,
    })._d,
    end: moment().set({
      hour: 16,
      minute: 30,
    })._d,
    type: 'reminder',
    notes: 'At least a glass.',
  },
  {
    id: UIDv4(),
    title: 'Grooming',
    start: moment()
      .add(3, 'days')
      .set({
        hour: 11,
        minute: 0,
      })._d,
    end: moment()
      .add(3, 'days')
      .set({
        hour: 12,
        minute: 30,
      })._d,
    type: 'meeting',
    notes: 'Pay attention',
  },
];

export default initialEvents;
