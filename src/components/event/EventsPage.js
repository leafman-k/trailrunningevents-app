import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import {browserHistory} from 'react-router';
import EventTable from './EventTable';
import Pagination from '../common/Pagination';
import toastr from 'toastr';
const MAX_ON_PAGE = 5;
class EventsPage extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      currentPage: 1,
      numOfPages: this.countNumOfPages(props.events.length),
      eventsOnPage: this.getEventsToTable(1)
    };
    this.redirectToAddEventPage = this.redirectToAddEventPage.bind(this);
    this.deleteTrailEvent = this.deleteTrailEvent.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
    this.setPreviousPage = this.setPreviousPage.bind(this);
  }
  getEventsToTable(currentPage){
    const beginIndex =  (currentPage -1) * MAX_ON_PAGE;
    const endIndex = (currentPage -1) * MAX_ON_PAGE + MAX_ON_PAGE;
    return this.props.events.slice(beginIndex, endIndex);
  }
  countNumOfPages(events){
    let pages = 0;
      if(events > 0){
        pages = Math.floor(events/MAX_ON_PAGE);
        console.log('countNumOfPages:' + pages);
      }
      if(pages > 0){
        pages = events%MAX_ON_PAGE != 0 ? pages + 1 : pages;
      }
    return pages;
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
  setCurrentPage(event){
    event.preventDefault();
    const pageId = parseInt(event.currentTarget.dataset.id);
    const nextEvents = this.getEventsToTable(pageId);
    this.setState({currentPage: pageId, eventsOnPage: nextEvents});

  }
  setNextPage(event){
    if(this.state.currentPage == this.state.numOfPages)
      return false;
    let nextPage = this.state.currentPage + 1;
    const nextEvents = this.getEventsToTable(nextPage);
    this.setState({currentPage: nextPage, eventsOnPage: nextEvents});

  }
  setPreviousPage(event){
    if(this.state.currentPage == 1)
      return false;
    let previousPage = this.state.currentPage - 1;
    const previousEvents = this.getEventsToTable(previousPage);
    this.setState({currentPage: previousPage, eventsOnPage: previousEvents});
  }
  render(){
    const events = this.state.eventsOnPage;
    console.log('Events:' + events);
    console.log('CurrentPage:' + this.state.currentPage);
    console.log('Num of Pages:' + this.state.numOfPages);

    return (
      <div>
      <div className="col-xs-12 col-sm-6">
        <h1>Trail Running Events</h1>
      </div>
      <div className="col-xs-12 col-sm-6">
        <input type="submit"
               value="Add New Event"
               className="btn btn-primary pull-right rowbutton"
               onClick={this.redirectToAddEventPage}/>
      </div>
      <div className="col-xs-12">
      <EventTable events={events} onDelete={this.deleteTrailEvent}/>
        {this.state.numOfPages > 1  &&
          <Pagination numOfPages={this.state.numOfPages}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                    onNext={this.setNextPage}
                    onPrevious={this.setPreviousPage}/>
       }
     </div>
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
