import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import SettingsIcon from '@material-ui/icons/Settings';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
}));

const buttonstyle = {
  position: 'absolute',
  right: '8vw',
  top: '50%'
}

const AccountModal = (props) => {

  const { userName, following, followers } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const delete_my_account = () => { props.delete_account(props.user_id, props.avatar); };
  const logout = () => { props.logout(); }


  return (
    <div>
      <div style={ buttonstyle }>
        <SettingsIcon onClick={ handleOpen } style={ MyTheme.icon }/>
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={ classes.paper }>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p>user name : { userName }</p>
          <p>Following : { following.length }</p>
          <p>Followers : { followers.length }</p>
          <button onClick={ logout } >LOG OUT</button>
          <br/><br/>
          <button onClick={ delete_my_account } >delete my account</button>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
        </div>
      </Modal>
    </div>
  );
}



const mapStateToProps = (reducer) => {
  return {
    user_id: reducer.user_id,
    avatar: reducer.avatar,
    userName: reducer.userName,
    following: reducer.following,
    followers: reducer.following
   }
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOG_OUT' }),
  delete_account: (user_id, avatar) => dispatch({ type: 'DELETE_USER_SAGA', values: { user_id, avatar } })
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
