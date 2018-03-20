import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registrationActions from '../../actions/registrationActions';
import toastr from 'toastr';
import MyEventList from './MyEventList';
class MyEventsPage extends React.Component{

  constructor(props){
    super(props);
    this.cancelRegistration = this.cancelRegistration.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('shouldComponentUpdate: ' + this.props.myEvents !== nextProps.myEvents);
  //   return this.props.myEvents !== nextProps.myEvents;
  // }
  cancelRegistration(event){
    console.log('Cancelling registration');
    event.preventDefault();
    let eventId = event.currentTarget.dataset.id;
    this.setState({saving: true});
    this.props.actions.cancelRegistration(eventId).
      then(() => this.redirect('Registration has been Cancelled successfully'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  redirect(message) {
    console.log('Redirecting....');
    this.setState({saving: false});
    toastr.success(message);
    if(this.props.myEvents.length == 0){
     this.context.router.push('/home');
    }
  }
  render(){
    const myEvents = this.props.myEvents;
    return (
      <MyEventList myEvents={myEvents} onCancel={this.cancelRegistration}/>
    );
  }
}
MyEventsPage.propTypes = {
  myEvents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired

};
MyEventsPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps){

  return {
    myEvents: state.myEvents
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(registrationActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyEventsPage);
