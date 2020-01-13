import { createMuiTheme } from '@material-ui/core/styles';
//import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
      }
    }
  },
  signupButton: {
    padding:'20px',
    width: '150px',
    borderRadius: '0'
  },
  palette: {
    primary: {
      main:'#03D'
    },
  secondary: {
      main: '#36F'
    },
  background:{paper: '#F00'},
  },
  typography: {
    useNextVariants: true,
  },
  close_button: {
    position:'absolute',
    right:'40px',
    top:'40px',
    cursor:'pointer',
    color:'#445',
  },
  close_button2: {
    position:'absolute',
    right:'30px',
    top:'30px',
    cursor:'pointer',
    color:'#FFF',
  },
  icon: {
    top: '50%',
    transform: `translate(0%, -50%)`,
    fontSize: 30,
    color: '#808089',
    cursor: 'pointer',
  },
  profile_icon: {
    top: '50%',
    transform: `translate(0%, -45%)`,
    fontSize: 36,
    color: '#808089',
    cursor: 'pointer',
  },
  custom_file_upload: {
    display: 'block',
    position: 'absolute',
    top: '210px',
    left: '5%',
    overflow: 'hidden',
    textAlign: 'center',
    width:'44%',
    height:'50px',
    backgroundColor: '#60607D',
    color: '#FAFAFA',
    boxShadow: '0px 4px 4px #AAA',
    cursor: 'pointer',
  },
  logout: {
    display: 'block',
    position: 'absolute',
    top: '250px',
    left: '9%',
    overflow: 'hidden',
    textAlign: 'center',
    width:'40%',
    height:'50px',
    backgroundColor: '#FFF',
  //  backgroundColor: '#60607D',
  //  color: '#FAFAFA',
    color: '#60607D',
  //  boxShadow: '0px 4px 4px #AAA',
    cursor: 'pointer',
    border: '1px solid #60607D'

  },
  delete_my_account: {
    display: 'block',
    position: 'absolute',
    textAlign: 'center',
    top: '250px',
    left: '51%',
    width:'40%',
    height:'50px',
    backgroundColor: '#FFF',
    color: '#DD6060',
    // backgroundColor: '#DD6060',
    // color: '#FAFAFA',
  //  boxShadow: '0px 4px 4px #AAA',
    cursor: 'pointer',
    border: '1px solid #DD6060'
  },
});
