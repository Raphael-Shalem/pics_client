import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
//import DefaultAvatar from '../graphic_components/default_avatar.png';
import AvatarIcon from '../graphic_components/avatar_icon.png';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
//import Avatar from '@material-ui/core/Avatar';



const styles = {
  button: {
       textAlign: 'center',
       marginTop: '35px',
       width:'64%',
       height:'50px',
       backgroundColor: '#60607D',
       color: '#FAFAFA',
       boxShadow: '0px 4px 4px #AAA',
       cursor: 'pointer',
       border: '0px'
    },
    grid_style: {
      width: '80%',
      height: '70px',
      display: 'grid',
      gridTemplateColumns: '1fr 6fr',
      marginLeft: '50%',
      marginTop: '5px',
      transform: `translate(-50%, 0%)`,
      color:'#444455'
    },
    avatar: {
      top: '30%',
      left: '50%',
    },
    avatardiv: {
      paddingTop:'5px',
    },
    icon: {
      marginLeft: '0px',
      paddingTop:'5px',
      fontSize: 45,
      color: '#778',
    }
}

  const SetUpModal = (props) => {


  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: props.size > 550 ? 400 : (props.size-100),
      height: 530,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      overflow: 'hidden',
      textAlign: 'center'
    },
  }));

  const { first_entry } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(first_entry);
  const handleClose = () => {
     props.cancel_first_entry()
     setOpen(false);
   };

  return (
    <div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <h2 id="simple-modal-title" style={{margin: '90px 0 45px 0', color:'#334'}}>Set Up Your Account</h2>
          <div style={ styles.grid_style } >
             <div  style={styles.avatardiv}>
                <img  alt="avatar" height="45px" src={ AvatarIcon }  style={styles.avatar}/>
             </div>
             <p>Upload your profile picture</p>
          </div>
          <div style={ styles.grid_style } >
              <div >
                <AddCircleIcon style={styles.icon}/>
              </div>
              <p>Upload your Images</p>
          </div>
          <div style={ styles.grid_style } >
            <div >
              <SearchIcon  style={styles.icon}/>
            </div>
            <p>Search for people to follow</p>
          </div>
          <button onClick={ handleClose } style={ styles.button }>Got It</button>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
        </div>
      </Modal>
    </div>
  );
}




const mapStateToProps = (reducer) => {
  return {
    first_entry: reducer.first_entry
   }
};

const mapDispatchToProps = dispatch => ({
    cancel_first_entry: () => dispatch({ type: 'CANCEL_FIRST_ENTRY' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SetUpModal);
