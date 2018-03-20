import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component{
  render() {
  return (
    <div className="container-fluid">
    <Header authenticated ={this.props.isAuthenticated} role={this.props.role}/>
      {this.props.children}
    </div>
  );
}
}
App.propTypes ={
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string
};
function mapStateToProps(state, ownProps){
  return {
    isAuthenticated: state.isAuthenticated,
    role: state.user.role
  };
}
export default connect(mapStateToProps)(App);
