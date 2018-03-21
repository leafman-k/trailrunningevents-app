import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import {browserHistory} from 'react-router';
import EventTable from './EventTable';
import toastr from 'toastr';

class EventsPage extends React.Component{

  constructor(props){
    super(props);
    this.redirectToAddEventPage = this.redirectToAddEventPage.bind(this);
    this.deleteTrailEvent = this.deleteTrailEvent.bind(this);
  }
  redirectToAddEventPage(){
      browserHistory.push('/event');
  }
  deleteTrailEvent(event){
    const eventId = event.currentTarget.dataset.id;
    console.log('EventsPage eventid: ' + eventId);
    this.props.actions.deleteEvent(eventId).then(() => {
      toastr.success('Event has been removed successfully');
    }).catch(error => {
      toastr.error(error);
    });

  }
  render(){
    const {events} = this.props;
    return (
      <div>
      <h1>Events</h1>
      <input type="submit"
             value="Add Event"
             className="btn btn-primary"
             onClick={this.redirectToAddEventPage}/>
           <EventTable events={events} onDelete={this.deleteTrailEvent}/>
    </div>
  );
  }
}
EventsPage.propTypes = {
  events: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownPros){
  return {
    events: state.events
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
