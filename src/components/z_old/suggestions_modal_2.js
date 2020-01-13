// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal';
// import CloseIcon from '@material-ui/icons/Close';
// import Avatar from '@material-ui/core/Avatar';
// import DefaultAvatar from '../graphic_components/default_avatar.png';
// import MyTheme from '../../theme';
//
// const useStyles = makeStyles(theme => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     height: 450,
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(2, 4, 3)
//   },
// }));
//
// const grid_style = {
//   width: '100%',
//   display: 'grid',
//   gridTemplateColumns: '1fr 2fr',
//   border: '1px solid #DDD',
//   backgroundColor: '#EEE',
//   padding: '20px',
//   marginLeft: '50%',
//   marginTop: '5px',
//   cursor: 'pointer',
//   transform: `translate(-50%, 0%)`
// }
//
// const SuggstionsModal = (props) => {
//
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => { setOpen(true); };
//   const handleClose = () => {
//      props.close_suggstions_modal();
//      setOpen(false);
//    };
//
//   const open_modal = React.useCallback(handleOpen);
//
//   React.useEffect(() => {
//     if (props.open_suggstions_modal_2) { open_modal() }
//   },[open_modal, props.open_suggstions_modal_2]);
//
//   const set_other_user = (user) => {
//     handleClose();
//     props.get_paths_for_other_user(user);
//   }
//
//   const Default = () => { return(<div>default</div>) }
//
//   const MakeUsers = () => <> {
//       props.suggested_users.map((user, index) => {
//         return(
//           <div key={ index }>
//             <div style={ grid_style } onClick={ e => set_other_user(user) }>
//                 <Avatar style={{ width:'55px', height:'55px' }}
//                         alt="avatar"
//                         src={ user.avatar ? user.avatar : DefaultAvatar }
//                 />
//                <p>{user.userName}</p>
//             </div>
//           </div>
//         )
//       }
//   )} </>
//
//   const Users = props.suggested_users && props.suggested_users.length ? MakeUsers : Default;
//
//   return (
//     <div>
//       <Modal open = { open } onClose = { handleClose }>
//         <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={ classes.paper }>
//           <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
//           <div style={{ width: '70%', marginTop: '50%', marginLeft: '50%', transform: `translate(-50%, -40%)` }}>
//             <Users/>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
//
// //
//
// const mapStateToProps = (reducer) => {
//   return {
//     open_suggstions_modal_2: reducer.open_suggstions_modal_2,
//     other_user: reducer.other_user,
//     suggested_users: reducer.suggested_users
//    }
// };
//
// const mapDispatchToProps = dispatch => ({
//   close_suggstions_modal: () => dispatch({ type: 'CLOSE_SUGGESTIONS_MODAL', paylaod: 2 }),
//   get_paths_for_other_user: (user) => dispatch({ type: 'GET_PATHS_FOR_OTHER_USER_SAGA', value: { user } }),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(SuggstionsModal);
