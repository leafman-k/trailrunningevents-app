import React, {PropTypes} from 'react';
import SelectInput from '../common/SelectInput';

const RegistrationForm = ({registration, event, distances, divisions, onChange, onRegistration, errors, saving}) => {

  return (
    <div>
      <h1>Registering to {event.name}</h1>
      <div className="row">
        <div className="col-sm-6">
          <h5>Date: {event.date}</h5>
        </div>
        <div className="col-sm-6">
          <h5>Location: {event.location}</h5>
        </div>
        <div className="col-sm-6">
          <h5>Name: {registration.firstName} {registration.lastName}</h5>
        </div>
      </div>
        <SelectInput
           name="distance"
           label="Distance"
           value={registration.distance}
           defaultOption="Select Distance"
           options={distances}
           onChange={onChange}
           error={errors.distance}/>
       <SelectInput
          name="division"
          label="Division"
          value={registration.division}
          defaultOption="Select Division"
          options={divisions}
          onChange={onChange}
          error={errors.division}/>
          <input
          name="registerbutton"
          type="submit"
          disabled={saving}
          value={saving ? 'Registering...' : 'Register'}
          className="btn btn-primary"
          onClick={onRegistration}/>
      </div>

  );

};
RegistrationForm.propTypes ={
  registration: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  distances: PropTypes.array.isRequired,
  divisions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  saving: PropTypes.bool.isRequired
};
export default RegistrationForm;
