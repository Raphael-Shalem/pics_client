import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
//import Theme from '../../theme';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <button type="button" onClick={ handleOpen }>
        Open Modal
      </button>
      <Modal

        open = { open }
        onClose = { handleClose }
      >
        <div style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </div>
  );
}
