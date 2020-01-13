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
    transform: `translate(-50%, -50%)`,
    cursor: 'pointer'
  }
}
  const ImageModal = (props) => {

    const useStyles = makeStyles(theme => ({
      paper: {
        position: 'absolute',
        width: props.size[0],
        height: props.size[1],
    //    backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        textAlign: 'center'
      },
    }));

    const { my_width, my_height, picSize, size } = props;
    const orientaion = my_height > my_width ? 1 : 0;
    let img_height = picSize, img_left = 0, img_top = 0;

    if (orientaion) {
       img_height = my_height * picSize / my_width;
       img_top = (my_height * picSize / my_width - picSize) / -2;
     }

    else {
        img_left = (my_width * picSize / my_height - picSize) / -2;
     }

  const ratio = size[0] / my_width;

  const modal_pic_height = orientaion ?
        (Math.min(((my_height * ratio) - 50), (size[1] - 50))) :
        (Math.min(((size[0] - 50) * my_height / my_width), (size[1] - 50)));


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <div onClick={ handleOpen }>
       <img
         src={ props.my_src }
         alt='img'
         height={ `${img_height}px` }
         style={{ transform: `translate(${img_left}px, ${img_top}px)` }}
       />
      </div>
      <Modal
        open = { open }
        onClose = { handleClose }
      >
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <img
            onClick={ handleClose }
            src={ props.my_src }
            alt='img'
            height={ `${modal_pic_height}px` }
            style={ styles.img }
          />
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button2 }/>
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
