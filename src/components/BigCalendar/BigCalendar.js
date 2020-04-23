import React, { useState, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';

import { UIDv4, formatDateForList, formatDateOnCreateEvent } from '../../utils';

import { initialEvents } from '../../constants/initialEvents';
import { calendarFormats } from '../../constants/calendarFormats';

import { Modal } from '../Modal/Modal';

import './calendar.scss';

import { CreateEventForm, EditEventForm, WeekHeader } from './components';

const localizer = momentLocalizer(moment);

export const BigCalendar = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [eventList, setEventList] = useState(initialEvents);
  const [selectedSlot, setSelectedSlot] = useState();
  const [eventToEdit, setEventToEdit] = useState();
  const [editModalOffset, setEditModalOffset] = useState({
    top: 0, left: 0,
  });
  const [currentView, setCurrentView] = useState('month');

  useEffect(() => {
    setCreateModalOpen(true);
    setEditModalOpen(false);
  }, [selectedSlot]);

  useEffect(() => {
    setEditModalOpen(true);
    setCreateModalOpen(false);
  }, [eventToEdit]);

  const handleCreate = (formValues) => {
    setEventList([
      ...eventList,
      {
        id: UIDv4(),
        title: formValues.title,
        start: formatDateOnCreateEvent(
          formValues.date,
          formValues.time,
          'start',
        ),
        end: formatDateOnCreateEvent(formValues.date, formValues.time, 'end'),
        type: formValues.color,
        notes: formValues.notes,
      },
    ]);
    setCreateModalOpen(false);
  };

  const handleEdit = (formValues) => {
    const previousEvents = eventList.filter(
      event => event.id !== formValues.id,
    );
    const { date, time } = formValues;

    setEventList([
      ...previousEvents,
      {
        id: formValues.id,
        title: formValues.title,
        start: formatDateForList(date, time, 'start'),
        end: formatDateForList(date, time, 'end'),
        type: formValues.color,
        notes: formValues.notes,
      },
    ]);
    setEditModalOpen(false);
  };

  const removeEvent = () => {
    setEventList(eventList.filter(event => event.id !== eventToEdit.id));
    setEditModalOpen(false);
  };

  const DraggableCalendar = withDragAndDrop(Calendar);

  const handleDropEvent = (eventDragged) => {
    if (!moment(eventDragged.start).isBefore()) {
      const previousEvents = eventList.filter(
        event => event.id !== eventDragged.event.id,
      );

      setEventList([
        ...previousEvents,
        {
          ...eventDragged.event,
          start: eventDragged.start,
          end: eventDragged.end,
        },
      ]);
    }
  };

  return (
    <div className="calendar-container">
      <DraggableCalendar
        formats={calendarFormats}
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        eventPropGetter={event => ({
          className: `event-${event.type}`,
        })}
        components={{
          week: {
            timeGutterHeader: WeekHeader,
          },
        }}
        onSelectSlot={(slot) => {
          if (createModalOpen) {
            setCreateModalOpen(false);
          } else if (!editModalOpen) {
            return !moment(slot.start).isBefore()
              ? setSelectedSlot(slot)
              : false;
          } else {
            setEventToEdit(undefined);
            setEditModalOpen(false);
          }

          return true;
        }}
        selectable
        onSelectEvent={(event, e) => {
          setEventToEdit(event);
          setEditModalOffset({
            top: e.pageY + 10, left: e.pageX,
          });
        }}
        draggableAccessor={() => true}
        resizableAccessor={() => false}
        onEventDrop={handleDropEvent}
        view={currentView}
        onView={(view) => {
          setEventToEdit(undefined);
          setCurrentView(view);
          setEditModalOpen(false);
          setCreateModalOpen(false);
        }}
      />
      {createModalOpen && selectedSlot ? (
        <Modal
          top={
            (selectedSlot.box && selectedSlot.box.y)
            || (selectedSlot.bounds && selectedSlot.bounds.bottom)
          }
          left={
            (selectedSlot.box && selectedSlot.box.x)
            || (selectedSlot.bounds && selectedSlot.bounds.left)
          }
          onClose={() => setCreateModalOpen(false)}
        >
          <CreateEventForm
            start={selectedSlot.start}
            end={selectedSlot.end}
            onCancel={() => setCreateModalOpen(false)}
            onSubmit={handleCreate}
          />
        </Modal>
      ) : null}
      {editModalOpen && eventToEdit ? (
        <Modal
          top={editModalOffset.top}
          left={editModalOffset.left}
          onClose={() => {
            setEventToEdit(undefined);
            setEditModalOpen(false);
          }}
        >
          <EditEventForm
            eventInfo={eventToEdit}
            onCancel={removeEvent}
            onSubmit={handleEdit}
          />
        </Modal>
      ) : null}
    </div>
  );
};
