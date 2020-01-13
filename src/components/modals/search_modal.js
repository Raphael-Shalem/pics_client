import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import MyTheme from '../../theme';
import InputBase from '@material-ui/core/InputBase';


const SearcModal = (props) => {


    const useStyles = makeStyles(theme => ({
      paper: {
        position: 'absolute',
        width: props.size > 550 ? 400 : (props.size-100),
        height: 450,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3)
      },
    }));

  const initial_state = {
       user_input: '',
       show_sub_button: 0.2,
       disable_sub_button: true
  };

  const classes = useStyles();
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => {
     setState(initial_state);
     props.empty_search_result();
     setOpen(false);
   };
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(initial_state);
   const onChange = (event) => {
      setState({
         user_input: event.target.value,
         show_sub_button: (event.target.value.length && event.target.value !== props.userName) ? 1 : 0.2,
         disable_sub_button: event.target.value.length ? false : true,
        });
      if (props.search_result === 'no users found') { props.empty_search_result() }
   };
   const onSubmit = (event) => {
       event.preventDefault();
       console.log('test');
       let userName = props.userName;
       let user_input = state.user_input;
       if (userName === user_input) {
         setState({
            user_input: userName,
            show_sub_button: 0.2,
            disable_sub_button: true,
           });
        }
       else { props.search_for_user(user_input) }
   };

   const displaySuggestions = () => {
     setState(initial_state);
     props.get_suggestions();
     props.open_suggstions_modal();
     handleClose();
   }

   const close_modal = React.useCallback(handleClose);

   React.useEffect(() => {
     if (props.search_result === 'users found') {
       props.empty_search_result();
       props.open_suggstions_modal();
       close_modal();
     }
   }, [props, close_modal]);


  let h2top = (props.search_result === 'no users found' || props.userName === state.user_input) ? '0px' : '100px';

  return (
    <div>
      <SearchIcon onClick={ handleOpen } style={ MyTheme.icon }/>
      <Modal open = { open } onClose = { handleClose }>
        <div style={{ textAlign: 'center', top: '50%', left: '50%', transform: `translate(-50%, -50%)` }} className={ classes.paper }>
          { (props.search_result === 'no users found') && (<h2 style = {{ color:'#F55', marginTop: '50px' }}>No user by that name exists</h2>) }
          { (props.userName === state.user_input) && (<h2 style = {{ color:'#F55', marginTop: '50px' }}>{`That's You!`}</h2>) }
          <h2 style = {{ color:'#445', marginTop: h2top }}>Find people to follow</h2>
          <CloseIcon onClick={ handleClose } style = { MyTheme.close_button }/>
          <form onSubmit={ onSubmit }>
            <InputBase placeholder="Search…" type="text" id="search_user" name='search_user' onChange={ onChange } style ={{ backgroundColor: '#F8F8FF', padding: '10px', width: '70%' }}/>
            <button
               type="submit"
               disabled= {state.disable_sub_button}
               style={{
                 opacity: state.show_sub_button,
                 display: 'block',
                 margin: 'auto',
                 textAlign: 'center',
                 marginTop: '30px',
                 width:'60%',
                 height:'50px',
                 backgroundColor: '#DD6060',
                 color: '#FAFAFA',
                 boxShadow: '0px 4px 4px #AAA',
                 cursor: 'pointer',
                 border: '0px'
               }}
            >submit</button>
            <button
               onClick = { displaySuggestions }
               style={{
                 display: 'block',
                 margin: 'auto',
                 marginTop: '30px',
                 textAlign: 'center',
                 width:'60%',
                 height:'50px',
                 backgroundColor: '#60607D',
                 color: '#FAFAFA',
                 boxShadow: '0px 4px 4px #AAA',
                 cursor: 'pointer',
                 border: '0px'
               }}
            >Suggestions For You</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}



const mapStateToProps = (reducer) => {
  return {
    userName: reducer.userName,
    search_result: reducer.search_result
   }
};

const mapDispatchToProps = dispatch => ({
  search_for_user: (user_input, userName) => dispatch({ type: 'SEARCH_FOR_USER_SAGA', value: { user_input, userName } }),
  get_suggestions: () => dispatch({ type: 'REQUEST_USER_SUGGESTIONS_SAGA' }),
  empty_search_result: () => dispatch({ type: 'EMPTY_SEARCH_RESULT' }),
  open_suggstions_modal: () => dispatch({ type: 'OPEN_SUGGESTIONS_MODAL', payload: 1 })

});

export default connect(mapStateToProps, mapDispatchToProps)(SearcModal);
