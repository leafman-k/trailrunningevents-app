import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
const EventForm = ({trailEvent, startDate, onChange, onDateChange, onSave, onDelete, inProgress, errors}) => {

  return (
    <form onSubmit={onSave}>
      <h1>Manage Trail Event</h1>
      <TextInput
        name="name"
        label="Name"
        value={trailEvent.name}
        placeholder="Name"
        onChange={onChange}
        error={errors.name}/>
      <TextInput
        name="www"
        label="WWW"
        value={trailEvent.www}
        placeholder="www"
        onChange={onChange}
        error={errors.www}/>
      <div className="form-group">
          <label htmlFor="date">Date</label>
          <div className="field">
     <DatePicker
              name="date"
              selected={startDate}
              className="form-control"
              onChange={onDateChange}
              locale="fi"
          />
      </div>
    </div>
     <TextInput
        name="location"
        label="Location"
        value={trailEvent.location}
        placeholder="Location"
        onChange={onChange}
        error={errors.location}/>
    <TextInput
        name="available"
        label="Available"
        value={trailEvent.available}
        placeholder="Available"
        onChange={onChange}
        error={errors.available}/>
      <TextInput
        name="division"
        label="Division"
        value={trailEvent.division}
        placeholder="Divisions, comma separated"
        onChange={onChange}
        error={errors.division}/>
      <TextInput
          name="distance"
          label="Distance(s)"
          value={trailEvent.distance}
          placeholder="Distances, comma separated"
          onChange={onChange}
          error={errors.distance}/>
     <TextInput
          name="fee"
          label="Fee"
          value={trailEvent.fee}
          placeholder="Fee"
          onChange={onChange}
          error={errors.fee}/>
      <input
        name="savebutton"
        type="submit"
        disabled={inProgress}
        value={inProgress ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        />
      <input
        name="deletebutton"
        type="submit"
        disabled={inProgress}
        value={inProgress ? 'Deleting...' : 'Delete'}
        className="btn btn-danger"
        onClick={onDelete}/>
    </form>
  );
};
EventForm.propTypes = {
  trailEvent: React.PropTypes.object,
  startDate: React.PropTypes.object,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  inProgress: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default EventForm;
