import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from './RegistrationForm';
import * as registrationActions from '../../actions/registrationActions';
import toastr from 'toastr';
class RegistrationPage extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      registration: Object.assign({}, this.props.registration),
      event: Object.assign({}, this.props.event),
      errors: [],
      saving: false,
      isDirty: false
    };
    this.updateRegistrationState = this.updateRegistrationState.bind(this);
    this.registerToEvent = this.registerToEvent.bind(this);
   }

   updateRegistrationState(event) {
    const field = event.target.name;
    let registration = this.state.registration;
    registration[field] = event.target.value;
    this.setState({isDirty: true});
    return this.setState({registration: registration});
  }
  registerToEvent(event){
    console.log('Registering event');
    event.preventDefault();
    if(!this.registrationFormIsValid()){
      return;
    }
    console.log('Registration: ' + Object.values(this.state.registration));
    this.setState({saving: true, isDirty: false});
    this.props.actions.registerToEvent(this.state.registration).
      then(() => this.redirect('Saved successfully'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  registrationFormIsValid(){
    // TODO add proper validation
    return true;
  }
  redirect(message) {
    console.log('Redirecting....');
    this.setState({saving: false});
    toastr.success(message);

     this.context.router.push('/myevents');
  }
  render() {
    return (
      <RegistrationForm
        registration={this.state.registration}
        event={this.state.event}
        distances = {formatToDropDown(this.state.event.distance)}
        divisions = {formatToDropDown(this.state.event.division)}
        onChange={this.updateRegistrationState}
        onRegistration={this.registerToEvent}
        errors={this.state.errors}
        saving={this.state.saving}/>
    );

  }
}
RegistrationPage.propTypes = {
  registration: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
RegistrationPage.contextTypes = {
  router: PropTypes.object
};
function formatToDropDown(array){
  return array.map(value =>{
    return {
      value: value,
      text: value.charAt(0).toUpperCase() + value.slice(1)
    };
  });
}
function mapStateToProps(state, ownProps){
  const eventId = ownProps.params.id;
  console.log('mapStateToProps eventid ' + eventId);
  if(eventId && state.events.length > 0){
    event = getEventById(state.events, eventId);
    console.log('event: '+ Object.values(event));
  }
  console.log('state: ' + state);
  console.log('User: ' + Object.values(state.user));
  let registration = {
    eventName: event.name,
    eventId: eventId,
    eventDate: event.date,
    location: event.location,
    fee: event.fee,
    userId: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    distance: '',
    division: '',
    status: ''
  };
  return {
    event: event,
    registration: registration
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(registrationActions, dispatch)
  };
}
function getEventById(events, eventId){
  const event = events.filter(event => event.id == eventId);

  // filter returns always an array
  if(event) return event[0];

  return null;
}
export default connect(mapStateToProps,mapDispatchToProps)(RegistrationPage);
