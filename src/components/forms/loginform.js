import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik, /*withFormik,*/ Form, Field } from 'formik';
import * as Yup from 'yup';
import PasswordField from './input_fields/pword_input';
import EmailField from './input_fields/email_input';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Loader from '../graphic_components/loader';
//import Avatar from '@material-ui/core/Avatar';
//import Logo from '../graphic_components/logo.png';



const styles = {

  button: {
    display: 'block',
    margin: 'auto',
    marginTop: '30px',
    textAlign: 'center',
    width:'35%',
    height:'50px',
  //  backgroundColor: '#1A1A33',
    backgroundColor: '#1A1A33',

  //  backgroundColor: '#30304B',
    color: '#CCD',
    boxShadow: '0px 4px 4px #222',
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
    color: '#DDE'
  }
};



const LogInForm_ = (props) => {

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
      status,
      wrong_credentials,
      classes: { button }
    } = props;

  //  console.log(props)
      return(
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
      //    backgroundColor: '#494958',
          backgroundColor: '#494958',
          width: size > 600 ? '500px' : '95%',
          padding: '100px 0 100px 0',
          textAlign: 'center',
          borderRadius: '3%',
          border: '1px solid #20202F'
      }}>
        <Form>
        { wrong_credentials && <p style={ styles.link2 }>wrong username or password!</p> }

          <p style={ styles.error }>{ status && status.globalErrors }</p>
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
          <Button
           variant="contained"
           color="primary"
           type='submit'
           disabled = { isSubmitting }
           className = { button }
           style= {styles.button}
           >
             Log In
          </Button>
        </Form>
        <br/>
        <br/>

        <Link to='/Signup' style={ styles.link2 } >Sign Up</Link>
      </div>
    )
}

const LogInForm = withStyles(styles)(LogInForm_);

const FormikLogInForm = (props) => {
  var { wrong_credentials } = props;
/*
  const[state, setState] = React.useState({
    email: '',
    password: '',
    wrong_credentials: false,
    error: ''
  })
*/
  const handleSubmit = (values, {resetForm, setErrors, setSubmitting}) => {
    setSubmitting(false)
    props.login(values)
  //  resetForm();
  }

  React.useEffect(() => {
      if (props.user_loged_in) { props.history.push('/ProfilePage') }
    },[props.history, props.user_loged_in]
  )


    return (
      <div>
        <Formik
          initialValues = {{
            email: props.email || '',
            password: props.password || ''
          }}
          validationSchema = { Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required()
            })
          }
          onSubmit = { handleSubmit }
          render = {
            props => {
            //  console.log("props.isSubmitting: ",props);
              if (props.isSubmitting) { return (<Loader /> );}
              return (<LogInForm {...props  } wrong_credentials = { wrong_credentials }/>);
            }
          }
        />
        <br/>
        <br/>
      </div>
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(FormikLogInForm);
