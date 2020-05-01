import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { event } from '../events/events';
import { Modal } from '../Modal/Modal';

import './calendar.scss';

const localizer = momentLocalizer(moment);

export const UseCalendar = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState(event.events);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={state}
        startAccessor="start"
        endAccessor="end"
      />

      <Modal />
    </div>
  );
};
