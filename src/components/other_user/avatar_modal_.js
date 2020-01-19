import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
import DefaultAvatar from '../graphic_components/default_avatar.png';
import Loader from '../graphic_components/loader';

//const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080';

const styles = {
  root: {
    margin: 'auto',
    width:'130px',
    height:'130px',
    cursor: 'pointer'
  },
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
//    backgroundColor: '#EEE',
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
  avatar1: {
    width:'130px',
    height:'130px',
    margin:'auto'
   },
  avatar2: {
    width:'80px',
    height:'80px',
    margin:'auto'
  },
  loader: {
    height: '50px',
    width: '50px',
    margin: 'auto',
    marginTop: '30px',
  }
}


const AvatarModal = (props) => {

  // const useStyles = makeStyles(theme => ({
  //   paper: {
  //     position: 'absolute',
  //     width: 500,
  //     height: 350,
  //     backgroundColor: theme.palette.background.paper,
  //   ///  padding: theme.spacing(2, 4, 3)
  //   },
  // }));

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

  let { other_user, followers, user_id, show_loader } = props;
  let following = JSON.parse(JSON.stringify(props.following));


  const src = other_user.avatar ? other_user.avatar : DefaultAvatar;

  let toggle = React.useMemo(() => {

     if (following.indexOf(props.other_user._id) === -1) {
        return 0;
     }
     return 1;
   }, [following, props.other_user._id]);

/// 0 means i'm not following the other user, 1 means that I am.

  let buttonState = toggle ? {
    background_color: '#DD6060',
    text: 'Unfollow'
  } :
  {
    background_color: '#60607D',
    text: 'Follow'
  };

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const onClick = () => {
    toggle = 1 - toggle;

    setError(null);

    if (toggle) {
       other_user.followers.push(user_id);
       following.push(other_user._id);
     }
    else {
      other_user.followers.splice(other_user.followers.indexOf(user_id), 1);
      following.splice(following.indexOf(other_user._id), 1);
    }

    props.toggle_loader();
    props.follow_other_user(user_id, other_user._id, following, followers, other_user.followers);

  }

  const go_to_following = () => {
    if(!props.other_user.following.length) {
      setError(`${props.other_user.userName} is not following anyone`);
      return;
    }
    setError(null);
    props.search_for_user(props.other_user.following)
    handleClose();
    props.open_suggstions_modal()
  }
  const go_to_followers = () => {
    if(!props.other_user.followers.length) {
      setError(`${props.other_user.userName} has no followers`);
      return;
    }
    setError(null);
    props.search_for_user(props.other_user.followers)
    handleClose();
    props.open_suggstions_modal()
  }

  return (
    <div>
      <div style = { styles.root}>
        <Avatar onClick={ handleOpen } alt='avatar' src={src} style={ styles.avatar1 }/>
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
       <div style={ styles.paper } className={classes.paper}>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <h2 style = { error ? styles.error : styles.h2 }>{ error ? error : props.other_user.userName }</h2>
          <div style={ styles.grid_style }>
            <Avatar  alt='avatar' src={src} style={ styles.avatar2 }/>
            <div>
              <p style={ styles.p } onClick={ go_to_following } >following: { other_user && other_user.following && other_user.following.length }</p>
              <p style={ styles.p } onClick={ go_to_followers } >followers: { other_user && other_user.followers && other_user.followers.length }</p>
            </div>
          </div>
          {
            ((!show_loader) && (
              <button
                onClick={ onClick }
                style={{
                    display: 'block',
                    margin: 'auto',
                    marginTop: '30px',
                    textAlign: 'center',
                    width:'60%',
                    height:'50px',
                    backgroundColor: buttonState.background_color,
                    color: '#FAFAFA',
                    boxShadow: '0px 4px 4px #AAA',
                    cursor: 'pointer',
                    border: '0px'
                  }}
                >{ buttonState.text }
              </button>
            )) ||
            ((show_loader) && (<div style={styles.loader}><Loader/></div>))
           }
       </div>
      </Modal>
    </div>
  );
}


const mapStateToProps = (reducer) => {

  return {
    other_user: reducer.other_user,
    user_id: reducer.user_id,
    following: reducer.following,
    followers: reducer.followers,
    show_loader: reducer.show_loader
  }
};

const mapDispatchToProps = dispatch => ({
  follow_other_user: (user_id, other_user_id, following, followers, other_user_followers) => dispatch({ type: 'FOLLOW_OTHER_USER_SAGA', values: { user_id, other_user_id, following, followers, other_user_followers } }),
  search_for_user: (user_input) => dispatch({ type: 'SEARCH_FOR_USER_SAGA', value: { user_input } }),
  toggle_loader: () => dispatch({ type: 'TOGGLE_LOADER' }),
  open_suggstions_modal: () => dispatch({ type: 'OPEN_SUGGESTIONS_MODAL' })

});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModal);
