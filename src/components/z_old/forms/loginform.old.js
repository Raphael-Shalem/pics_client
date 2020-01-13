import React from 'react';
import { connect } from 'react-redux';
import { Formik, /*withFormik,*/ Form, Field } from 'formik';
import * as Yup from 'yup';
import SignUpButton from '../buttons/signup_button';

class LoginForm extends React.Component{

  render() {

    return(
      <div>
        <SignUpButton/>
        <Form>
          <div>
            { this.props.touched.email && this.props.errors.email && <p>{ this.props.errors.email }</p> }
            <Field
              type='string'
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


class FormikLoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      wrong_credentials: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    //if(values.email === 'z@z.z') {
    //  setErrors({ email: 'Email already taken' })
  //  } else {
      resetForm()
  //  }
    setSubmitting(false)
    this.props.login(values)
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
        { this.props.wrong_credentials && <p>wrong username or password</p> }
        <Formik
          initialValues = {{
            email: this.props.email || '',
            password: this.props.password || ''
          }}
          validationSchema = { Yup.object().shape({
                email: Yup.string().required(),
                password: Yup.string().required()
            })
          }
          onSubmit = { this.handleSubmit }
          component = { LoginForm }
        />
      </div>
    )

  }
}


const mapStateToProps = (reducer) => {
  return {
    wrong_credentials: reducer.wrong_credentials,
    user_id: reducer.user_id,
    user_loged_in: reducer.user_loged_in
  };
};

const mapDispatchToProps = dispatch => ({
  login: login_values => dispatch({ type: 'LOGIN_REQUEST_SAGA', login_values })
});

export default connect(mapStateToProps, mapDispatchToProps)(FormikLoginForm);
