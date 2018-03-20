import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import * as signInActions from '../../actions/signInActions';
import {connect} from 'react-redux';
class SignOutPage extends React.Component{

  componentWillMount() {
      this.props.actions.signOut();
      this.context.router.push('/home');
  }

  render(){
    return null;
  }
}
SignOutPage.propTypes = {
  actions: PropTypes.object.isRequired
};
SignOutPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps){
  return {};
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(signInActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage);
