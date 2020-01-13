import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import DefaultAvatar from '../graphic_components/default_avatar.png';

const styles = {
  paper: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    textAlign: 'center'
  },
  grid_style: {
    width: '65%',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    padding: '20px',
    marginLeft: '50%',
    marginTop: '5px',
    transform: `translate(-50%, 0%)`
  },
  error: {
    marginTop: '50px',
    color:'#F55'
  },
  h2: {
    color:'#445',
    marginTop: '50px'
  },
  p: {
    cursor: 'pointer',
    color:'#445'
  },
  avatar2: {
    width:'80px',
    height:'80px',
    margin:'auto'
  },
  buttonstyle: {
    position: 'absolute',
    right: '8vw',
    top: '50%'
  }
}


const MyAccountModal = (props) => {

    const useStyles = makeStyles(theme => ({
      paper: {
        position: 'absolute',
        width: props.size > 550 ? 500 : '95%',
        height: 350,
        backgroundColor: theme.palette.background.paper,
      },
    }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);

  let { userName, avatar } = props;
  let following = JSON.parse(JSON.stringify(props.following));
  let followers = JSON.parse(JSON.stringify(props.followers));

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => {
    setError(null);
    setOpen(false);
  };
  const delete_my_account = () => { props.delete_account(props.user_id, props.avatar); };
  const logout = () => { props.logout(); }

  const go_to_following = () => {
    if(!following.length) {
      setError(`You are not following anyone`);
      return;
    }
    setError(null);
    props.search_for_user(following)
    handleClose();
    props.open_suggstions_modal()
  }
  const go_to_followers = () => {
    if(!followers.length) {
      setError(`You have no followers`);
      return;
    }
    setError(null);
    props.search_for_user(followers)
    handleClose();
    props.open_suggstions_modal()
  }

  return (
    <div>
      <div style={ styles.buttonstyle }>
        <SettingsIcon onClick={ handleOpen } style={ MyTheme.icon }/>
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
       <div style={ styles.paper } className={classes.paper}>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <h2 style = { error ? styles.error : styles.h2 }>{ error ? error : userName }</h2>
          <div style={ styles.grid_style }>
            <Avatar  alt='avatar' src={ avatar.length ? avatar : DefaultAvatar } style={ styles.avatar2 }/>
            <div>
              <p style={ styles.p } onClick={ go_to_following } >following: { following && following.length }</p>
              <p style={ styles.p } onClick={ go_to_followers } >followers: { followers && followers.length }</p>
            </div>

          </div>
          <button onClick={ delete_my_account } style= { MyTheme.delete_my_account } >DELETE MY ACCOUNT</button>
          <button onClick={ logout } style = { MyTheme.logout }>LOG OUT</button>
       </div>
      </Modal>
    </div>
  );
}


const mapStateToProps = (reducer) => {

  return {
    user_id: reducer.user_id,
    following: reducer.following,
    followers: reducer.followers,
    show_loader: reducer.show_loader,
    avatar: reducer.avatar,
    userName: reducer.userName,
  }
};

const mapDispatchToProps = dispatch => ({
  search_for_user: (user_input) => dispatch({ type: 'SEARCH_FOR_USER_SAGA', value: { user_input } }),
  toggle_loader: () => dispatch({ type: 'TOGGLE_LOADER' }),
  open_suggstions_modal: () => dispatch({ type: 'OPEN_SUGGESTIONS_MODAL' }),
  logout: () => dispatch({ type: 'LOG_OUT' }),
  delete_account: (user_id, avatar) => dispatch({ type: 'DELETE_USER_SAGA', values: { user_id, avatar } })

});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountModal);
