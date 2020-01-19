import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik, /*withFormik,*/ Form, Field } from 'formik';
import * as Yup from 'yup';
import PasswordField from './input_fields/pword_input';
import EmailField from './input_fields/email_input';
import UserNameField from './input_fields/username_input';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Loader from '../graphic_components/loader';


const styles = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    backgroundColor: '#B0B0C5',
    width: '500px',
    padding: '100px 0 100px 0',
    textAlign: 'center',
    borderRadius: '3%',
    border: '1px solid #20202F'
  },
  button: {
    display: 'block',
    margin: 'auto',
    marginTop: '30px',
    textAlign: 'center',
    width:'35%',
    height:'50px',
  //  backgroundColor: '#1A1A33',

  //backgroundColor: '#37375B',
    backgroundColor: '#3F3F5B',
    color: '#CCD',
  //  boxShadow: '0px 4px 4px #555',
    cursor: 'pointer',
    border: '0px'
  },
  error: {
    color: '#F00'
  },
  t1: {
    marginTop: '20px'
  },
  link2:{
    textDecoration: 'none',
    color: '#37375B'
  }
};



const SignupForm_ = (props) => {

  const [size, setSize] = React.useState(0);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

    const {
      isSubmitting,
      user_already_exists,
      classes: { button }
    } = props;

    return(
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          backgroundColor: '#A0A0B4',
          width: size > 600 ? '500px' : '95%',
          padding: '100px 0 100px 0',
          textAlign: 'center',
          borderRadius: '3%',
          border: '1px solid #20202F'
      }}>
        <Form>
        { user_already_exists && <p style={ styles.link2 }>A user with this Email address already exists!</p> }
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
        <br/>
        <br/>
        <Link to='/Login' style={ styles.link2 } >Log In</Link>
     </div>
    )
}

const SignupForm = withStyles(styles)(SignupForm_);

const FormikSignupForm = (props) => {

  var { user_already_exists } = props;

  const [state] = React.useState({
    email: '',
    password: '',
    username: '',
    error: ''
  });

  const handleSubmit = (values, {resetForm, setErrors, setSubmitting}) => {
    if(props.user_already_exists) {
      setErrors({ email: 'A user with this Email address already exists!' })
    } //else {
  //    resetForm()
  //  }
    setSubmitting(false)
    props.signup(values)
  }
/*
  const go_to_login = () => {
    props.history.push('/Login')
  }
*/
  React.useEffect(() => {
      if (props.user_loged_in) { props.history.push('/ProfilePage') }
    },[props.history, props.user_loged_in]
  )

    return (
      <div>
        <p style={ styles.link2 }> {state.error} </p>
        <Formik
          initialValues = {{
            username: props.name || '',
            email: props.email || '',
            password: props.password || ''
          }}
          validationSchema = { Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required()
            })
          }
          onSubmit = { handleSubmit }
          render = {
            props => {
              if (props.isSubmitting) { return (<Loader /> );}
              return (<SignupForm {...props} user_already_exists={ user_already_exists }/>);
            }
          }
        />
      </div>
    )
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
