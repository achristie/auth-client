import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleSubmit(formProps) {
    //call action creator to send to server

    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      );
    }
  }
  
  render() {
    const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} />
          {email.touched && email.error && <div className='error'>{email.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Password</label>
          <input className='form-control' type='password' {...password} />
          {password.touched && password.error && <div className='error'>{password.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password</label>
          <input className='form-control' type='password' {...passwordConfirm} />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password ='Please enter a password';
  }

  if (formProps.password != formProps.passwordConfirm) {
    errors.password = "Passwords must match!";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}


export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);