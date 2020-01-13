import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';

const buttonstyle = {
  position: 'absolute',
  left: '8vw',
  top: '50%'
}

const SearcModal = (props) => {

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: props.size > 550 ? 400 : (props.size - 100),
      height: 450,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3)
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <div style={ buttonstyle }>
       <HelpIcon onClick={ handleOpen } style={ MyTheme.icon }/>
      </div>
      <Modal open = { open } onClose = { handleClose }>
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={ classes.paper }>
          <div style={{ marginTop: '25%' }}>
            <h2 id="simple-modal-title" style={{color:'#445'}}>About this app</h2>
            <p style={{color:'#445'}}>
            This app is basically a simplified version of Instagram.<br/>
            It allows the user to upload data and files to the server and access data and files uploaded by other users.<br/>
            It implements React JS, Redux-Saga, and Material UI in the front end and Node JS, Express, MongoDB and Mongoose on the server side.
            <br/><br/>
            For more info contact raphael.shalem@gmail.com
            </p>
          </div>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
        </div>
      </Modal>
    </div>
  );
}



const mapStateToProps = (reducer) => {
  return {

   }
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SearcModal);
