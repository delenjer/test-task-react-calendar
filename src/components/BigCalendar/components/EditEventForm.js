import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik } from 'formik';

import { eventOptions } from '../../../constants/eventOptions';
import { FORM_DATE, FORM_TIME } from '../../../constants/dateTimeFormats';

import { Select } from '../../Select/Select';

const EditEventForm = ({ eventInfo, onCancel, onSubmit }) => {
  const initialValues = {
    title: eventInfo.title,
    date: moment(eventInfo.start).format(FORM_DATE),
    time: `${moment(eventInfo.start).format(FORM_TIME)} - ${moment(
      eventInfo.end,
    ).format(FORM_TIME)}`,
    notes: eventInfo.notes,
    color: eventInfo.type,
    id: eventInfo.id,
  };

  const onChange = ({ name, value }, formikMethod) => {
    if (value.length < 31) {
      if (
        name === 'notes'
        || name === 'title'
        || (name === 'time' && /^[0-9:-\s]*$/.test(value))
      ) {
        formikMethod(name, value);
      }

      if (name === 'date' && /^[0-9/]*$/.test(value)) {
        formikMethod(name, value);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        let errors = {};

        if (values.title === '') {
          errors = {
            ...errors, title: 'Title is required',
          };
        }

        if (values.date === '') {
          errors = {
            ...errors, date: 'Date is required',
          };
        }

        if (values.time === '') {
          errors = {
            ...errors, time: 'Time is required',
          };
        }

        if (values.notes === '') {
          errors = {
            ...errors, notes: 'Notes is required',
          };
        }

        if (values.color === '') {
          errors = {
            ...errors, color: 'Color is required',
          };
        }

        return errors;
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
      render={({
        values,
        handleBlur,
        setFieldValue,
        errors,
        touched,
        isSubmitting,
        submitForm,
        isValid,
        setTouched,
      }) => (
        <form onSubmit={submitForm}>
          <div className="input-group">
            <div className="input-container">
              <span>event title *</span>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={(event) => {
                  onChange(event.target, setFieldValue);
                }}
                onBlur={handleBlur}
                className={`${
                  touched.title && errors.title ? 'error-input' : ''
                }`}
              />
              {touched.title && errors.title && (
                <span className="text-error">{errors.title}</span>
              )}
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <span>event date *</span>
              <input
                type="text"
                name="date"
                value={values.date}
                onChange={(event) => {
                  onChange(event.target, setFieldValue);
                }}
                onBlur={handleBlur}
                className={`${
                  touched.date && errors.date ? 'error-input' : ''
                }`}
              />
              {touched.date && errors.date && (
                <span className="text-error">{errors.date}</span>
              )}
            </div>
            <div
              className={`icon-container ${
                touched.date && errors.date ? 'error-input' : ''
              }`}
            >
              <i className="far fa-calendar-alt" />
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <span>event time *</span>
              <input
                type="text"
                name="time"
                value={values.time}
                onChange={(event) => {
                  onChange(event.target, setFieldValue);
                }}
                onBlur={handleBlur}
                className={`${
                  touched.time && errors.time ? 'error-input' : ''
                }`}
              />
              {touched.time && errors.time && (
                <span className="text-error">{errors.time}</span>
              )}
            </div>
            <div
              className={`icon-container ${
                touched.time && errors.time ? 'error-input' : ''
              }`}
            >
              <i className="far fa-clock" />
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <span>notes *</span>
              <input
                type="text"
                name="notes"
                value={values.notes}
                onChange={(event) => {
                  onChange(event.target, setFieldValue);
                }}
                onBlur={handleBlur}
                className={`${
                  touched.notes && errors.notes ? 'error-input' : ''
                }`}
              />
              {touched.notes && errors.notes && (
                <span className="text-error">{errors.notes}</span>
              )}
            </div>
          </div>

          <div className="input-group">
            <Select
              placeholder="color"
              value={values.color}
              options={eventOptions}
              onSelect={option => setFieldValue('color', option.id)}
              isError={Boolean(touched.color) && Boolean(errors.color)}
              onBlur={() => {
                setTouched({
                  ...touched,
                  color: true,
                });
              }}
              errorText={touched.color && errors.color ? errors.color : ''}
            />
          </div>

          <div className="button-group">
            <button onClick={onCancel} type="button">
              Discard
            </button>
            <button
              onClick={submitForm}
              type="button"
              disabled={isSubmitting || !isValid}
            >
              Edit
            </button>
          </div>
        </form>
      )}
    />
  );
};

EditEventForm.propTypes = {
  eventInfo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    type: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditEventForm;
