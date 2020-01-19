import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



const AddPicModal = (props) => {

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
     file: null,
     file_name: '',
     user_id: '',
     show_sub_button: 0.2,
     disable_sub_button: true
   });
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => {
     setError('');
     setOpen(false);
   };
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
      if (props.paths.length > 4) {
        setError('to_many_paths');
        return;
      }
      setError('');
      setOpen(false);
      let pic = state.file;
      let { user_id, userName, avatar } = props;
      props.upload_image(pic, user_id, userName, avatar);
      props.show_pictuer_grid_loader();
      setState({ show_sub_button: 0.2, disable_sub_button: true });
      if(props.feed_page_mark || props.other_user) { props.empty_other_user_object() }

  };
  const onChange = (event) => {
     setState({
        file: event.target.files[0],
        file_name: event.target.files[0] ? event.target.files[0].name : '',
        show_sub_button: 1,
        disable_sub_button: false
       });
  };

  return (
    <div>
      <AddCircleIcon onClick={ handleOpen } style={ MyTheme.icon }/>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
        <div style={{ textAlign: 'center', top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <h2 style = {{ color:'#445', marginTop: '100px' }}>Select a file to upload</h2>
          { (error === 'wrong_file_type') && (<h2 style = {{ color:'#F55' }}>Only PNJ, JPG and JPEG files allowed!</h2>) }
          { (error === 'wrong_file_size') && (<h2 style = {{ color:'#F55' }}>Please choose a smaller file</h2>) }
          { (error === 'to_many_paths') && (<p style = {{ color:'#F55', fontSize:'20px' }}>Why are you uploading so many files to a demo app?!</p>) }
          <form onSubmit={ onSubmit }>
            <br/><br/>
            <label htmlFor="file-upload" style={ MyTheme.custom_file_upload } >
               <p style={{ marginTop:'13px', fontSize: 13}}>
                 { state.file_name || <AddCircleOutlineIcon/> }
               </p>
            </label>
            <input type="file" id="file-upload" name='pic' onChange={ onChange }/>
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



const mapStateToProps = (reducer) => {
  return {
     user_id: reducer.user_id,
     userName: reducer.userName,
     avatar: reducer.avatar,
     other_user: reducer.other_user,
     feed_page_mark: reducer.feed_page_mark,
     paths: reducer.paths
   }
};

const mapDispatchToProps = dispatch => ({
  upload_image: (pic, user_id, userName, avatar) => dispatch({ type: 'UPLOAD_IMAGE_SAGA', image_values: { pic, user_id, userName, avatar } }),
  empty_other_user_object: () => dispatch({ type: 'EMPTY_OTHER_USER_OBJECT' }),
  show_pictuer_grid_loader: () => dispatch({ type: 'SHOW_PCTURE_GRID_LOADER' })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPicModal);
