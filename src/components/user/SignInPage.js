import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import * as signInActions from '../../actions/signInActions';
import toastr from 'toastr';
class SignInPage extends React.Component{

  constructor(props){
    super();
    this.state = {
      credentials: {
        userName: '',
        password: ''
      },
      inProgress: false,
      errors: [],
      redirectURI: props.redirectURI
    };
    this.updateSignInState = this.updateSignInState.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  updateSignInState(event) {
   const field = event.target.name;
   let credentials = this.state.credentials;
   credentials[field] = event.target.value;
   this.setState({isDirty: true});
   return this.setState({credentials: credentials});
  }
  signIn() {
    this.props.actions.signIn(this.state.credentials).
      then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({inProgress: false});
      });
  }
  redirect(){
    console.log('Redirecting...' + this.state.redirectURI);
    if(this.state.redirectURI.length > 0){
      this.context.router.push(this.state.redirectURI);
    } else {
      this.context.router.push('/home');
    }
  }
  render() {
    return (
      <div>
        <SignInForm
          credentials={this.state.credentials}
          errors={this.state.errors}
          onChange={this.updateSignInState}
          onSignIn={this.signIn}
          inProgress={this.state.inProgress}/>
      </div>
    );

  }
}
SignInPage.propTypes ={
  redirectURI: PropTypes.string,
  actions: PropTypes.object.isRequired
};
SignInPage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps){
  let redirectURI ='';
  if(ownProps.location.state != null){
    redirectURI = ownProps.location.state.nextPathname;
  }
  return {
    redirectURI: redirectURI
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(signInActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
