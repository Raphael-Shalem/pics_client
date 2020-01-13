// import React from 'react';
// import { connect } from 'react-redux';
// import { Formik, /*withFormik,*/ Form, Field } from 'formik';
// import * as Yup from 'yup';
// //import SearchField from './input_fields/search_field';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
//
//
// const SearchField = (props) => {
//   return(
//     <InputBase
//       placeholder="Search…"
//       style ={{ position: 'absolut', top: '-7px', padding: '10px' }}
//     />
//   )
// };
//
// const SearchForm = (props) => {
//
//     const {
//       isSubmitting,
//   //    classes: { button }
//     } = props;
//
//     return(
//         <Form>
//             <SearchIcon style ={{ paddingTop: '20px' }}/>
//             <Field
//               name='user name'
//               component = {SearchField}
//             />
//             <br/>
//             <button
//                type="submit"
//                disabled= {isSubmitting}
//                style={{
//                  opacity: { sub_button.sub_opacity },
//                  display: 'block',
//                  margin: 'auto',
//                  textAlign: 'center',
//                  width:'44%',
//                  height:'50px',
//                  backgroundColor: '#DD6060',
//                  color: '#FAFAFA',
//                  boxShadow: '0px 4px 4px #AAA',
//                  cursor: 'pointer',
//                }}
//             >submit</button>
//         </Form>
//     )
// }
//
//
// const FormikSearchForm = (props) => {
//
//   const [state] = React.useState({ username: '', error: '' });
//   const [sub_button, setSub_button] = React.useState({ sub_opacity: 0.5, disable_sub_button: true });
//
//   const onChange = (event) => {
//      setSub_button({
//         sub_opacity: 1,
//         disable_sub_button: false
//        });
//   };//
//
//   const handleSubmit = (values, {resetForm, setErrors, setSubmitting}) => {
//     if(props.no_such_user) {
//       setErrors({ username: 'no_such_user' })
//     }
//     setSubmitting(false)
// //    props.signup(values)
//   }
//
//     return (
//       <div>
//         <p style={{color:'red'}}> {state.error} </p>
//         <Formik
//           initialValues = {{
//             username: props.name || '',
//           }}
//           validationSchema = { Yup.object().shape({
//             username: Yup.string().required(),
//             })
//           }
//           onSubmit = { handleSubmit }
//           render = {
//             props => {
//               return (<SearchForm {...props} />);
//             }
//           }
//         />
//       </div>
//     )
// }
//
// const mapStateToProps = (reducer) => {
//
//   return {
//     //user_already_exists: reducer.user_already_exists,
//   //  user_loged_in: reducer.user_loged_in,
//   //  user_id: reducer.user_id
//   };
// };
//
// const mapDispatchToProps = dispatch => ({
// //  signup: signup_values => dispatch({ type: 'SIGNUP_REQUEST_SAGA', signup_values })
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(FormikSearchForm);
