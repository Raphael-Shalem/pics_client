import React from 'react';
import { connect } from 'react-redux';
import { Formik, /*withFormik,*/ Form, Field } from 'formik';
import * as Yup from 'yup';
import PasswordField from './input_fields/pword_input';
import EmailField from './input_fields/email_input';
import UserNameField from './input_fields/username_input';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Loader from '../graphic_components/loader';

const styles = theme => ({
  button: theme.signupButton
})

class SignUpForm extends React.Component{

  render() {

    const {
      isSubmitting,
      status,
      classes: {button}
    } = this.props;

    return(
        <Form>
          <p style={{color:'red'}}>{ status && status.globalErrors }</p>
            <Field
              name='user name'
              component = {UserNameField}
            />
            <br/>
            <Field
              name='email'
              component = {EmailField}
            />
            <br/>
            <Field
              name = 'password'
              component = {PasswordField}
            />
            <br/>
            <br/>
          <Button
           variant="contained"
           color="primary"
           type='submit'
           disabled = { isSubmitting }
           className = { button }
           >
             Sign Up
          </Button>
        </Form>
    )
  }
}

const SignupForm = withStyles(styles)(SignUpForm);

class FormikSignUpForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    console.log('TESTING!@#')
    if(this.props.user_already_exists) {
      setErrors({ email: 'Email already taken' })
    } else {
      resetForm()
    }
    setSubmitting(false)
    console.log('values : ', values);
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
        <p style={{color:'red'}}> {this.state.error} </p>
        <Formik
          initialValues = {{
            username: this.props.name || '',
            email: this.props.email || '',
            password: this.props.password || ''
          }}
          validationSchema = { Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required()
            })
          }
          onSubmit = { this.handleSubmit }
          render = {
            props => {
            //  console.log("props.isSubmitting: ",props);
              if (props.isSubmitting) { return (<Loader /> );}
              return (<SignupForm {...props} />);
            }
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignUpForm);
