import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
import DefaultAvatar from '../graphic_components/default_avatar.png';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Loader from '../graphic_components/loader';


//const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080';

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
  const [error, setError] = React.useState('');
  const [state, setState] = React.useState({
     file: null, file_name: '',
     user_id: '',
     show_sub_button: 0.2,
     disable_sub_button: true
   });
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const onSubmit = (event) => {

     event.preventDefault();

     if (state.file.type !== 'image/png' && state.file.type !== 'image/jpeg') {
        setError('wrong_file_type');
        return;
     }
     if (state.file.size > 5242880 ) {
        setError('wrong_file_size');
        return;
     }

     setError('');
     let avatar = state.file;
     let avatarName = props.avatar;
     let { user_id, userName } = props;
     props.upload_avatar(avatar, user_id, userName, avatarName);
     props.show_avatar_loader_func();
     setState({ show_sub_button: 0.2, disable_sub_button: true });
     handleClose();
  };
  const onChange = (event) => {
     setState({
       file:event.target.files[0],
       file_name: event.target.files[0] ? event.target.files[0].name : '',
       show_sub_button: 1,
       disable_sub_button: false
     });
  };

/*  const delete_avatar = () => {
    let user_id = props.user_id;
    let userName = props.userName;
    let avatarName = props.avatar;
    props.delete_avatar(avatarName, userName, user_id);
  }
*/
  const AvatarComp = () => {
     return (
       <Avatar style={{ width:'130px', height:'130px', margin:'auto' }}
               onClick={ handleOpen }
               alt="avatar"
               src = { props.avatar ? props.avatar : DefaultAvatar }
       />
     )
   }

  return (
    <div>
      <div style = {{ margin: 'auto', width:'130px', height:'130px', cursor: 'pointer' }}>
        {
           ((props.show_avatar_loader === 1) && (<div style={{ width: '40px', marginLeft: '50%', transform: `translate(-50%, 0%)`}}><Loader/></div>)) ||
          ((props.show_avatar_loader === 0) && (<AvatarComp/>))
        }
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
       <div style={{ textAlign: 'center', top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <h2 style = {{color:'#445', marginTop: '100px'}}>Select a file to upload</h2>
          { (error === 'wrong_file_type') && (<h2 style = {{ color:'#F55' }}>Only PNJ, JPG and JPEG files allowed!</h2>) }
          { (error === 'wrong_file_size') && (<h2 style = {{ color:'#F55' }}>Please choose a smaller file</h2>) }
          <form onSubmit={ onSubmit }>
            <br/><br/>
            <label htmlFor="file-upload" style={ MyTheme.custom_file_upload } >
               <p style={{ marginTop:'13px', fontSize: 13}}>
                 { state.file_name || <AddCircleOutlineIcon/> }
               </p>
            </label>
            <input type="file" id="file-upload" name='avatar' onChange={ onChange }/>
            <br/><br/>
            <button
               type="submit"
               disabled= {state.disable_sub_button}
               style={{
                 opacity: state.show_sub_button,
                 display: 'block',
                 position: 'absolute',
                 textAlign: 'center',
                 top: '210px',
                 left: '51%',
                 width:'44%',
                 height:'50px',
                 backgroundColor: '#DD6060',
                 color: '#FAFAFA',
                 boxShadow: '0px 4px 4px #AAA',
                 cursor: 'pointer',
                 border: '0px'

               }}
            >submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

/*
<br/><br/>
<button style={{ display:'block' }} onClick={ delete_avatar }>delete avatar</button>
*/

const mapStateToProps = (reducer) => {
  return {
    user_id: reducer.user_id,
    userName: reducer.userName,
    avatar: reducer.avatar,
    show_avatar_loader: reducer.show_avatar_loader
  }
};

const mapDispatchToProps = dispatch => ({
  upload_avatar: (avatar, user_id, userName, avatarName) => dispatch({ type: 'UPLOAD_AVATAR_SAGA', image_values: { avatar, user_id, userName, avatarName } }),
  delete_avatar: (avatarName, userName, user_id) => dispatch({ type: 'DELETE_IMAGE_SAGA', values: { avatarName, userName, user_id } }),
  show_avatar_loader_func: () => dispatch({ type: 'SHOW_AVATAR_LOADER' })
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModal);
