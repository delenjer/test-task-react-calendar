/* eslint-disable */
import moment from 'moment';

import { FORM_DATE, DATE_TIME } from '../constants/dateTimeFormats';

/**
 * Returns unique id
 * @param {*} a
 */
export const UIDv4 = a => (a
  ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
  : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, UIDv4));

/**
 * @param {Date} date - event date, only one day event allowed
 * @param {string} [time=20:30 - 23:59] - event is happening within this time range
 * @param {string} [startOrEnd=start | end] - start or end of event range
 * Return Date for event list item
 */
export const formatDateForList = (date, time, startOrEnd) => {
  if (startOrEnd === 'start') {
    return moment(date, FORM_DATE).set({
      hour: time.split(' - ')[0].substring(0, 2),
      minute: time.split(' - ')[0].substring(3),
    })._d;
  }

  return moment(date, FORM_DATE).set({
    hour: time.split(' - ')[1].substring(0, 2),
    minute: time.split(' - ')[1].substring(3),
  })._d;
};

/**
 * Return Date for event list item
 * @param {Date} date - event date, only one day event allowed
 * @param {string} time
 * @param {string} [startOrEnd=start | end] - start or end of event range
 */
export const formatDateOnCreateEvent = (date, time, startOrEnd) => moment(
  `${date} ${time.split(' - ')[startOrEnd === 'start' ? 0 : 1]}`,
  DATE_TIME,
)._d;
