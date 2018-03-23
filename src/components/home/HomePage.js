import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import EventList from '../event/EventList';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import Pagination from '../common/Pagination';
const MAX_ON_PAGE = 6;
class HomePage extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state ={
      events: props.events,
      currentPage: 0,
      numOfPages: 0,
      eventsOnPage: []
    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
    this.setPreviousPage = this.setPreviousPage.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props != nextProps){
      this.setState({events: nextProps.events});
      const numOfPages = this.countNumOfPages(nextProps.events.length);
      const currentPage = 1;
      const eventsOnPage = this.getEventsToTable(currentPage, nextProps.events);
      this.setState({currentPage,numOfPages,eventsOnPage});
    }
  }
  getEventsToTable(currentPage, events){
    const beginIndex =  (currentPage -1) * MAX_ON_PAGE;
    const endIndex = (currentPage -1) * MAX_ON_PAGE + MAX_ON_PAGE;
    return events.slice(beginIndex, endIndex);
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
  setCurrentPage(event){
    event.preventDefault();
    const pageId = parseInt(event.currentTarget.dataset.id);
    const nextEvents = this.getEventsToTable(pageId, this.state.events);
    this.setState({currentPage: pageId, eventsOnPage: nextEvents});

  }
  setNextPage(event){
    if(this.state.currentPage == this.state.numOfPages)
      return false;
    let nextPage = this.state.currentPage + 1;
    const nextEvents = this.getEventsToTable(nextPage, this.state.events);
    this.setState({currentPage: nextPage, eventsOnPage: nextEvents});

  }
  setPreviousPage(event){
    if(this.state.currentPage == 1)
      return false;
    let previousPage = this.state.currentPage - 1;
    const previousEvents = this.getEventsToTable(previousPage, this.state.events);
    this.setState({currentPage: previousPage, eventsOnPage: previousEvents});
  }
  render(){
    const events = this.state.eventsOnPage;
    return (
      <div>
      <div className="jumbotron">
        <h1>Trail running events</h1>
        <p>Simple app for trail running events </p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
        <h3>Upcoming events</h3>
        <EventList events={events}/>
        <Pagination numOfPages={this.state.numOfPages}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                    onNext={this.setNextPage}
                    onPrevious={this.setPreviousPage}/>
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
