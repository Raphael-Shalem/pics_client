import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
import DefaultAvatar from '../graphic_components/default_avatar.png';
import Loader from '../graphic_components/loader';

//const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080'

const styles = {
  root: {
    width:'80px',
    height:'80px',
    cursor: 'pointer',
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
///    backgroundColor: '#EEE',
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
    width:'60px',
    height:'60px',
    margin:'auto'
   },
  avatar2: {
    width:'80px',
    height:'80px',
    margin:'auto',
    cursor: 'pointer'
  },
  loader2: {
    position: 'absolute',
    height: '50px',
    width: '50px',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
  button: {
      display: 'block',
      margin: 'auto',
      marginTop: '30px',
      textAlign: 'center',
      width:'60%',
      height:'50px',
      backgroundColor: '#DD6060',
      color: '#FAFAFA',
      boxShadow: '0px 4px 4px #AAA',
      cursor: 'pointer',
      border: '0px'
    }
}


const AvatarModal = (props) => {

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

  let { feed, other_user, followers, user_id } = props;
  let following = JSON.parse(JSON.stringify(props.following));

  const src = feed.avatar ? feed.avatar : DefaultAvatar;

   let loading = React.useMemo(() => {
      if (other_user) { return 0; }
      return 1;
    }, [other_user]);


  const handleOpen = () => {
     setOpen(true);
     props.search_for_user([props.feed.creator], 'skip_suggestions')
   };
  const handleClose = () => {
     props.empty_other_user_object();
     setOpen(false);
   };

   const onClick = () => {

     other_user.followers.splice(other_user.followers.indexOf(user_id), 1);
     following.splice(following.indexOf(other_user._id), 1);
     props.follow_other_user(user_id, other_user._id, following, followers, other_user.followers);
     props.toggle_loader();
     handleClose()

   }

   const go_to_other_user_profile = () => {
     setOpen(false);
     props.get_paths_for_other_user(other_user);
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
    props.open_suggstions_modal('skip')
  }

  const Comp = () => {
    return(
      <>
      <div style={ styles.grid_style }>
        <Avatar  alt='avatar' src={ src } style={ styles.avatar2 } onClick={ go_to_other_user_profile }/>
        <div>
          <p style={ styles.p } onClick={ go_to_following } >following: { other_user && other_user.following && other_user.following.length }</p>
          <p style={ styles.p } onClick={ go_to_followers } >followers: { other_user && other_user.followers && other_user.followers.length }</p>
        </div>
      </div>
      <button onClick={ onClick } style={ styles.button }>Unfollow</button>
      </>
    )
  }

  return (
    <div>
      <div style = { styles.root}>
        <Avatar onClick={ handleOpen } alt='avatar' src={ src } style={ styles.avatar1 }/>
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
       <div style={ styles.paper } className={classes.paper}>
        <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <h2  style = { error ? styles.error : styles.h2 }>{  error ? error : (other_user && other_user.userName ? other_user.userName : '') }</h2>
          {
             ((!loading) && (<Comp/>)) ||
             ((loading) && (<div style={styles.loader2}><Loader/></div>))
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
    followers: reducer.followers
  }
};

const mapDispatchToProps = dispatch => ({
  follow_other_user: (user_id, other_user_id, following, followers, other_user_followers) => dispatch({ type: 'FOLLOW_OTHER_USER_SAGA', values: { user_id, other_user_id, following, followers, other_user_followers } }),
  search_for_user: (user_input, skip) => dispatch({ type: 'SEARCH_FOR_USER_SAGA', value: { user_input, skip } }),
  open_suggstions_modal: () => dispatch({ type: 'OPEN_SUGGESTIONS_MODAL' }),
  get_other_user_info: (user) => dispatch({ type: 'GET_OTHER_USER_INFO_SAGA', value: { user } }),
  empty_other_user_object: (skip) => dispatch({ type: 'EMPTY_OTHER_USER_OBJECT', value: { skip: 'skip' } }),
  toggle_loader: () => dispatch({ type: 'TOGGLE_LOADER' }),
  get_paths_for_other_user: (user) => dispatch({ type: 'GET_PATHS_FOR_OTHER_USER_SAGA', value: { user } })
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModal);
