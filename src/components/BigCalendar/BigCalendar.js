import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { ModalEvent } from '../ModalEvent/ModalEvent';
import { Modal } from '../Modal/Modal';
import { events } from '../events/events';

import './calendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const formats = {
  dateFormat: 'D',
  dayFormat: 'ddd DD/MM',
};

export const BigCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [thisNotes, setThisNotes] = useState('');
  const [thisTitle, setThisTitle] = useState('');

  const [eventArray, setEventArray] = useState(events.event);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [color, setColor] = useState('#3b86ff');

  const [newEvent, setNewEvent] = useState({
    start: new Date(),
    end: new Date(),
    box: [0, 0],
  });

  const handleEditEvent = (item) => {
    const obj = {
      ...newEvent,
      box: [600, 480],
    };

    setThisNotes(item.resource[1]);
    setThisTitle(item.title);
    setNewEvent(obj);
    if (!isModal) {
      setIsModal(true);
      setIsEdit(true);
    }
  };

  const handleClose = () => {
    if (isModal) {
      setIsModal(false);
      setIsEdit(false);
    }
  };

  const setEventColor = () => ({ style: { background: color } });

  const onSaveEvent = (obj) => {
    if (isEdit) {
      setEventArray([
        // eslint-disable-next-line max-len
        ...eventArray.filter(elem => elem.title !== thisTitle),
        obj,
      ]);
    } else {
      setEventArray([...eventArray, obj]);
    }

    setIsModal(false);
  };

  const createNewEvent = (slot) => {
    if (!isModal) {
      setIsModal(true);
      const obj = {
        start: slot.slots[0],
        end: slot.slots[0],
        box: [slot.box.x, slot.box.y],
      };

      setNewEvent(obj);
    }
  };

  const choseColor = (customColor) => {
    setColor(customColor);
  };

  return (
    <div className="calendar-container">
      {isModal && (
        <Modal
          onClose={handleClose}
          x={newEvent.box[1]}
          y={newEvent.box[0]}
        >
          <ModalEvent
            thisNotes={thisNotes}
            thisTitle={thisTitle}
            isEdit={isEdit}
            setNewObj={setNewEvent}
            onCancel={handleClose}
            onSave={onSaveEvent}
            obj={newEvent}
            choseColor={choseColor}
          />
        </Modal>
      )}
      <Calendar
        resourceTitleAccessor="Calendar View"
        localizer={localizer}
        events={eventArray}
        startAccessor="start"
        step={60}
        popup
        formats={formats}
        endAccessor="end"
        selectable="ignoreEvents"
        onDoubleClickEvent={handleEditEvent}
        onSelecting={({ end, start }) => end === start}
        eventPropGetter={setEventColor}
        onSelectSlot={createNewEvent}
      />
    </div>
  );
};
