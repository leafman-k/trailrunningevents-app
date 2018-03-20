import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import EventForm from './EventForm';
import toastr from 'toastr';
import { withRouter } from 'react-router';

class ManageEventPage extends React.Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      trailEvent: Object.assign({}, this.props.event),
      errors: {},
      inProgress: false,
      isDirty: false
    };
    this.updateTrailEventState = this.updateTrailEventState.bind(this);
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
    this.setState({saving: true, isDirty: false});
    let runningEvent = this.state.trailEvent;
    runningEvent['division'] = this.state.trailEvent.division.split(',');
    runningEvent['distance'] = this.state.trailEvent.distance.split(',');


    this.props.actions.saveEvent(runningEvent).
      then(() => this.redirect('Saved successfully'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  deleteTrailEvent(event){
    console.log('deleteCourse');
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteCourse(this.state.course).
      then(() => this.redirect('Deleted successfully'))
      .catch(error => {
        toastr.error('DeleteCourse error:' + error);
        this.setState({saving: false});
      });
  }

  redirect(message) {
    console.log('Redirecting....');
    this.setState({saving: false});
    toastr.success(message);

    this.context.router.push('/events');
  }
  render() {
    return (
        <EventForm
          trailEvent={this.state.trailEvent}
          onChange={this.updateTrailEventState}
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

  // filter returns always an array
  if(trailEvent){
    let event = trailEvent[0];
    let modified = {id: event.id,
      name: event.name,
      www: event.www,
      date: event.date,
      location: event.location,
      available: event.available,
      division: event.division.join(","),
      distance: event.distance.join(","),
      fee: event.fee
    };
    return modified;
  }

  return {id: 0,
    name: '',
    www: '',
    date: '',
    location: '',
    available: '',
    division: '',
    distance: '',
    fee: ''
  };
}
function mapStateToProps(state, ownProps){
  const trailEventId = ownProps.params.id;

  let event = { id: 0, name: '', www: '', date: '', location: '', available: 0, division: '', distance: '', fee: '' };

  if(trailEventId && state.events.length > 0){
    event = getEventById(state.events, trailEventId);
    if(event == undefined){

      event = { id: 0, name: '', www: '', date: '', location: '', available: 0, division: '', distance: '', fee: '' };
    }
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
