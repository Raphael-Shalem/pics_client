import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import DefaultAvatar from '../graphic_components/default_avatar.png';
import MyTheme from '../../theme';
import Loader from '../graphic_components/loader';


const styles = {
  container: {
    display: "flex",
     flexDirection: "column",
     flex: 1,
     minHeight: 0,
     position: "absolute", // depends if in a container with position 'relatvie'. otherwise use 'relative' instead.
     top: '20%',
     left: '15%',
     bottom: 0,
     width: "70%"
   },
  content: {
    display: "flex",
     flexDirection: "column",
     flex: 1,
     overflowY: "auto",
     overflowX: "hidden",
     width: "100%",
     padding: 0
  },
  grid_style: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    //border: '1px solid #DDD',
    backgroundColor: '#EEEEF4',
    padding: '20px',
    marginLeft: '50%',
    marginTop: '5px',
    cursor: 'pointer',
    transform: `translate(-50%, 0%)`
  },
  p: {
     color:'#445'
   },
  error: {
     color: '#F55'
   }
}

const SuggstionsModal = (props) => {

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: props.size > 550 ? 400 : (props.size-100),
      height: 450,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3)
    },
  }));


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => {
     setError(null)
     props.close_suggstions_modal();
     setOpen(false);
   };

  const open_modal = React.useCallback(handleOpen);

  React.useEffect(() => {
    if (props.open_suggstions_modal) { open_modal() }
  },[props.open_suggstions_modal, open_modal]);

  const set_other_user = (user) => {
   if( user && user._id === props.user_id ) {
      setError(1)
      return;
    }
   handleClose();
   if(user) { props.get_paths_for_other_user(user); }
  }

  const Default = () => {
     return(
       <div style={{
         position:'absolute',
         left: '50%',
         transform: `translate(-50%, 0%)`
       }}>
         <Loader/>
       </div>
       )
     }

  const MakeUsers = () => <div style = { styles.content }> {
      props.suggested_users.map((user, index) => {
        return(
          <div key={ index }>
            <div style={ styles.grid_style } onClick={ e => set_other_user(user) }>
                <Avatar style={{ width:'55px', height:'55px', left:'20px' }}
                        alt="avatar"
                        src={ user && user.avatar ? user.avatar : (user ? DefaultAvatar : '') }
                />
               <p style={ error && user._id === props.user_id ? styles.error : styles.p }>
                 { error && user && user._id === props.user_id ? `That's You!` : (user ? user.userName : 'user no longer exists')}
               </p>
            </div>
          </div>
        )
      }
  )} </div>

  const Users = props.suggested_users && props.suggested_users.length ? MakeUsers : Default;

  return (
    <div>
      <Modal open = { open } onClose = { handleClose }>
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={ classes.paper }>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <div style={ styles.container }>
            <Users/>
          </div>
        </div>
      </Modal>
    </div>
  );
}


const mapStateToProps = (reducer) => {
  return {
    user_id: reducer.user_id,
    open_suggstions_modal: reducer.open_suggstions_modal,
    suggested_users: reducer.suggested_users
   }
};

const mapDispatchToProps = dispatch => ({
  close_suggstions_modal: () => dispatch({ type: 'CLOSE_SUGGESTIONS_MODAL', payload: 1 }),
  get_paths_for_other_user: (user) => dispatch({ type: 'GET_PATHS_FOR_OTHER_USER_SAGA', value: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggstionsModal);
