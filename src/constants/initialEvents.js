/* eslint-disable */
import moment from 'moment';

import { UIDv4 } from '../utils';

export const initialEvents = [
  {
    id: UIDv4(),
    title: "Get a job",
    start: moment().add(1, 'days')._d,
    end: moment().add(1, 'days')._d,
    type: 'reminder',
    allDay: true,
    notes: 'In the near future.',
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
];
