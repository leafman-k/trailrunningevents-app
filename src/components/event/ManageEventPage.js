import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import EventForm from './EventForm';
import toastr from 'toastr';
import { withRouter } from 'react-router';
import moment from 'moment';
class ManageEventPage extends React.Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      trailEvent: Object.assign({}, this.props.event),
      startDate: moment(),
      errors: {},
      inProgress: false,
      isDirty: false
    };
    this.updateTrailEventState = this.updateTrailEventState.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.saveTrailEvent = this.saveTrailEvent.bind(this);
    this.deleteTrailEvent = this.deleteTrailEvent.bind(this);
    }


  componentWillReceiveProps(nextProps){

    if(this.props.event.id != nextProps.event.id){
      //in case page is loaded directly
      console.log('componentWillReceiveProps');
      this.setState({trailEvent: Object.assign({}, nextProps.event)});
    }
  }



  updateTrailEventState(event) {
    const field = event.target.name;
    let runningEvent = this.state.trailEvent;
    runningEvent[field] = event.target.value;
    this.setState({isDirty: true});
    return this.setState({trailEvent: runningEvent});
  }
  handleDateChange(date){
    console.log(moment(date).format('DD.MM.YYYY'));
    let runningEvent = this.state.trailEvent;
    runningEvent[date] = moment(date).format('DD.MM.YYYY');
    this.setState({startDate: date});
  }
  eventFormIsValid(){

    let formsIsValid = true;
    let errors = {};
    if(this.state.trailEvent.name.length < 5){
      errors.name = 'Title must be at least 5 characters.';
      formsIsValid = false;
    }
    this.setState({errors: errors});
    return formsIsValid;
  }
  saveTrailEvent(event) {
    event.preventDefault();
    if(!this.eventFormIsValid()){
      return;
    }
    this.setState({inProgress: true, isDirty: false});
    let runningEvent = this.state.trailEvent;
    runningEvent['division'] = this.state.trailEvent.division.split(',');
    runningEvent['distance'] = this.state.trailEvent.distance.split(',');


    this.props.actions.saveEvent(runningEvent).
      then(() => this.redirect('Saved successfully'))
      .catch(error => {
        toastr.error(error);
        this.setState({inProgress: false});
      });

  }
  deleteTrailEvent(event){
    console.log('deleteTrailEvent');
    event.preventDefault();
    this.setState({inProgress: true});
    const eventId = this.state.trailEvent.id;
    this.props.actions.deleteEvent(eventId).
      then(() => this.redirect('Event has been removed successfully'))
      .catch(error => {
        console.log(error);
        toastr.error('Deleting trail event ends with error');
        this.setState({inProgress: false});
      });
  }

  redirect(message) {
    console.log('Redirecting....');
    this.setState({inProgress: false});
    toastr.success(message);

    this.context.router.push('/events');
  }
  render() {
    return (
        <EventForm
          trailEvent={this.state.trailEvent}
          startDate={this.state.startDate}
          onChange={this.updateTrailEventState}
          onDateChange={this.handleDateChange}
          onSave={this.saveTrailEvent}
          onDelete={this.deleteTrailEvent}
          errors={this.state.errors}
          inProgress={this.state.inProgress}/>
    );
  }
}
ManageEventPage.propTypes = {
 event: PropTypes.object.isRequired,
 actions: PropTypes.object.isRequired,
 router: PropTypes.object
};
ManageEventPage.contextTypes = {
  router: PropTypes.object
};
function getEventById(events, id){
  const trailEvent = events.filter(trailEvent => trailEvent.id == id);
  let modified = { id: 0, name: '', www: '', date: '', location: '', available: '0', division: '', distance: '', fee: '' };
  // filter returns always an array
  if(trailEvent && trailEvent[0]!= undefined){
    let event = trailEvent[0];
      return {id: event.id,
      name: event.name,
      www: event.www,
      date: event.date,
      location: event.location,
      available: event.available,
      division: event.division.join(","),
      distance: event.distance.join(","),
      fee: event.fee
    };
  }

  return modified;
}
function mapStateToProps(state, ownProps){
  console.log('Entering mapStateToProps');
  const trailEventId = ownProps.params.id;

  let event = { id: 0, name: '', www: '', date: '', location: '', available: '0', division: '', distance: '', fee: '' };
   console.log('Entering mapStateToProps ownProps eventid: ' + trailEventId);
  if(trailEventId && state.events.length > 0){
    event = getEventById(state.events, trailEventId);
  }
  console.log('mapStateToProps event: '+ Object.values(event));
  return {
    event: event

  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageEventPage);
