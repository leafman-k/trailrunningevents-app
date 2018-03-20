import React,{PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const SignInForm = ({credentials, errors, onChange, onSignIn, inProgress}) => {

  return (
    <div>
      <h1>Welcome to </h1>
      <TextInput
          name="userName"
          label="User Name"
          value={credentials.userName}
          placeholder="User name"
          onChange={onChange}
          error={errors.userName}/>
        <PasswordInput
            name="password"
            label="Password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
            error={errors.password}/>
       <input
          name="signInbutton"
          type="submit"
          disabled={inProgress}
          value={inProgress ? 'Signing in...' : 'Sign In'}
          className="btn btn-primary"
          onClick={onSignIn}/>
      </div>
  );

};
SignInForm.propTypes ={
  credentials: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  inProgress: PropTypes.bool.isRequired
};
export default SignInForm;
