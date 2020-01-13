import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import MyTheme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  img: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  },
  button: {
       position: 'absolute',
       textAlign: 'center',
       bottom: '70px',
       left: '50%',
       transform: `translate(-50%, 0%)`,
       width:'200px',
       height:'50px',
       backgroundColor: '#DD6060',
       color: '#FAFAFA',
       boxShadow: '0px 4px 4px #AAA',
       cursor: 'pointer',
       border: '0px'
    }
}
  const ImageModal = (props) => {

  const { my_width, my_height, picSize, size } = props;

  const modal_width = size[0] > 600 ? size[0]/1.5 : size[0] - 125;
  const modal_height = size[1]/1.2;

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: modal_width,
      height: modal_height,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      overflow: 'hidden',
      textAlign: 'center'
    },
  }));

  const orientaion = my_height > my_width ? 1 : 0;
  let img_height = picSize, img_left = 0, img_top = 0;

  if (orientaion) {
     img_height = my_height * picSize / my_width;
     img_top = (my_height * picSize / my_width - picSize) / -2;
   }

  else {
      img_left = (my_width * picSize / my_height - picSize) / -2;
   }

  const ratio = modal_width / my_width;
  const spacing = size[0] > 800 ? 170 : 50;

  const modal_pic_height = orientaion ?
        (Math.min(((my_height * ratio) - 170), (modal_height - 170))) :
        (Math.min(((modal_width - spacing) * my_height / my_width), (modal_height - spacing)));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const delete_ = () => {
     props.delete_image(props.my_src, props.user_id, props.userName);
     setOpen(false);
   }

  return (
    <div>
      <div onClick={ handleOpen }>
       <img src={ props.my_src } alt='img' height={ `${img_height}px` } style={{ transform: `translate(${img_left}px, ${img_top}px)` }}/>
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <div style={{
            position: 'absolute',
            left: '0px',
            top: '20px',
            width: '100%',
            height: `${modal_height - 140}px`
          }}>
            <img src={props.my_src} alt='img' height={ `${modal_pic_height}px` } style={ styles.img }/>
          </div>
          <br/>
          <button onClick={delete_} style={ styles.button }>delete this image</button>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
        </div>
      </Modal>
    </div>
  );
}




const mapStateToProps = (reducer) => {

  return {
     img_source: reducer.img_source,
     user_id: reducer.user_id,
     userName: reducer.userName
   }
};

const mapDispatchToProps = dispatch => ({
  delete_image: (source, user_id, userName) => dispatch({ type: 'DELETE_IMAGE_SAGA', values: { source, user_id, userName } })
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);
