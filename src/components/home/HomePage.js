import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import EventList from '../event/EventList';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';

class HomePage extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
  render(){
    const {events} = this.props;
    return (
      <div>
      <div className="jumbotron">
        <h1>Trail running events</h1>
        <p>Simple app for trail running events </p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
        <h3>Upcoming events</h3>
        <EventList events={events}/>
      </div>
    );
  }
}
HomePage.propTypes ={
  events: PropTypes.array.isRequired
};
function mapStateToProps(state, ownProps){
  return {
    events: state.events
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
