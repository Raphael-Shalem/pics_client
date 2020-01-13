import React from 'react';
import { connect } from 'react-redux';
import { Formik, /*withFormik,*/ Form, Field } from 'formik';
import * as Yup from 'yup';
import LogInButton from '../buttons/login_button';

class SignupForm extends React.Component{

  render() {

    return(
      <div>
        <LogInButton/>
        <Form>
          <div>
           { this.props.touched.username && this.props.errors.username && <p>{ this.props.errors.username }</p> }
            <Field
              type='username'
              name='username'
              placeholder='User Name'
            />
          </div>
          <div>
            { this.props.touched.email && this.props.errors.email && <p>{ this.props.errors.email }</p> }
            <Field
              type='email'
              name='email'
              placeholder='Email'
            />
          </div>
          <div>
            { this.props.touched.password && this.props.errors.password && <p>{ this.props.errors.password }</p> }
            <Field
              type='password'
              name='password'
              placeholder='Password'
            />
          </div>
          <button type='submit' disabled={this.props.isSubmitting}>Submit</button>
        </Form>
      </div>
    )
  }
}


class FormikSignupForm extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      user_already_exists:false
    }
  }


  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    if(this.props.user_already_exists) {
      setErrors({ email: 'Email already taken' })
    } else {
      resetForm()
    }
    setSubmitting(false)
    this.props.signup(values)
  }

  static getDerivedStateFromProps(nextProps, state) {
   if(nextProps.user_loged_in){
      nextProps.history.push('/HomePage')
   }
   return null;
  };

  render() {

    return (
      <div>
        { this.props.user_already_exists && <p>user_already_exists</p> }
        <Formik
          initialValues = {{
            username: this.props.username || '',
            email: this.props.email || '',
            password: this.props.password || ''
          }}
          validationSchema = { Yup.object().shape({
                username: Yup.string().required(),
                email: Yup.string().email('no good email').required('required'),
                password: Yup.string().min(8).required()
            })
          }
          onSubmit = { this.handleSubmit }
          component = { SignupForm }
        />
      </div>
    )

  }
}


const mapStateToProps = (reducer) => {

  return {
    user_already_exists: reducer.user_already_exists,
    user_loged_in: reducer.user_loged_in,
    user_id: reducer.user_id
  };
};

const mapDispatchToProps = dispatch => ({
  signup: signup_values => dispatch({ type: 'SIGNUP_REQUEST_SAGA', signup_values })
});

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignupForm);
