import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Calendar } from 'primereact/calendar';
import { SliderPicker } from 'react-color';
import classNames from 'classnames';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './UserEvent.scss';

export const ModalEvent = ({
  choseColor, onSave, setNewObj,
  obj, onCancel, isEdit,
  thisTitle, thisNotes,
}) => {
  const [title, setTitle] = useState(!isEdit ? '' : thisTitle);
  const [color, setColor] = useState('#3b86ff');
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isInputError, setInputError] = useState(false);
  const [notes, setNotes] = useState(!isEdit ? '' : thisNotes);

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    const fieldName = event.currentTarget.name;

    setInputError(false);

    switch (fieldName) {
      case 'title':
        setTitle(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      default:
    }
  };

  const handleCalendarDate = (date) => {
    setNewObj({
      ...obj, start: date.value,
    });
  };

  const handleCalendarTime = (time) => {
    setNewObj({
      ...obj, start: time.value,
    });
  };

  const handleChangeColor = (CustomColor) => {
    setColor(CustomColor.hex);
    choseColor(CustomColor.hex);
  };

  const handleColorsOpen = () => {
    setIsColorOpen(true);
  };

  const handlerSave = () => {
    if (title.length < 30 && title.length > 1) {
      const newEvent = {
        title,
        start: obj.start,
        end: obj.start,
        allDay: true,
        resource: [color, notes],
      };

      setIsColorOpen(false);
      onSave(newEvent);
    } else {
      setInputError(true);
    }
  };

  const handleCancel = () => {
    setIsColorOpen(false);
    setInputError(false);
    setNotes('');
    setTitle('');
    setColor('#3b86ff');
    onCancel();
  };

  return (
    <form className="event" action="#">
      <input
        name="title"
        type="text"
        className={
          classNames('event__input',
            { 'event__input--error': isInputError })
        }
        placeholder="event name"
        onChange={handleChange}
        value={title}
        autoComplete="none"
      />
      {isInputError && (
        <p className="event__error">
          Put more then 0  and less then 30 symbols
        </p>
      )}
      <div className="calendar-box">
        <Calendar
          name="date"
          value={obj.start}
          dateFormat="dd-mm-yy"
          onChange={handleCalendarDate}
        />
        <i className="icon-min far fa-calendar-alt" />
      </div>

      <div className="calendar-box">
        <Calendar
          name="time"
          value={obj.start}
          showTime
          timeOnly
          hourFormat="24"
          onChange={handleCalendarTime}
        />
        <i className="icon-min far fa-clock" />
      </div>

      <input
        name="notes"
        type="text"
        className="event__input"
        placeholder="notes"
        onChange={handleChange}
        value={notes}
      />

      <button
        name="color"
        type="button"
        className="event__buttons-color"
        onClick={handleColorsOpen}
      >
        Add color
      </button>

      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'buttons__event',
            'buttons__event--danger',
            { 'buttons__event--edit': isEdit },
          )}
          onClick={handleCancel}
        >
          {!isEdit ? 'Cancel' : 'Discard'}
        </button>

        <button
          type="button"
          onClick={handlerSave}
          className={
            classNames('buttons__event',
              { 'buttons__event--edit': isEdit })
          }
        >
          {!isEdit ? 'Save' : 'Edit'}
        </button>
      </div>
      {isColorOpen && (
        <SliderPicker
          color={color}
          onChangeComplete={handleChangeColor}
        />
      )}
    </form>
  );
};

ModalEvent.propTypes = {
  choseColor: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  setNewObj: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  obj: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  thisTitle: PropTypes.string.isRequired,
  thisNotes: PropTypes.string.isRequired,
};
