import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import Pisanello from '../graphic_components/pisanello.png';
// import MyTheme from '../../theme';


const styles = {
  button: {
    display: 'block',
    margin: 'auto',
    marginTop: '50px',
    textAlign: 'center',
    width:'35%',
    height:'50px',
  //  backgroundColor: '#20202F',
    backgroundColor: '#1A1A33',
    color: '#DDE',
    boxShadow: '0px 4px 4px #222',
    cursor: 'pointer',
    border: '0px'
  },
  pisanello: {
     width:'190px',
     height:'190px',
     margin:'auto',
  //   marginTop:'23vh'
  },
  h1: {
    marginTop:'10px',
    fontFamily: 'Dorsa',
    fontSize: 40,
    color: '#EBEBE0'
  },
  link:{
    textDecoration: 'none',
    fontSize:15,
    fontFamily:'Antic',
    color: '#DDE'
  },
  link2:{
    textDecoration: 'none',
    color: '#DDE'
  }
};


const ManePage = (props) => {

  const [size, setSize] = React.useState(0);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  let { user_loged_in, history } = props;

  React.useEffect(() => {
    if (user_loged_in) { history.push('/ProfilePage') }
  }, [user_loged_in, history])

    return (
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          backgroundColor: '#40404F',
          width: size > 550 ? '500px' : '95%',
          padding: '100px 0 100px 0',
          textAlign: 'center',
          borderRadius: '3%',
          border: '1px solid #20202F'
      }}>
          <Avatar style={styles.pisanello}
                       alt="avatar"
                       src={Pisanello}
          />
          <p style={styles.h1} >P I C S</p>
            <button style = { styles.button }>
              <Link to='/SignUp' style={ styles.link } >
                <p> Get Started </p>
              </Link>
            </button>
            <br/>
            <Link to='/Login' style={ styles.link2 } >Log In</Link>
      </div>
    );

}


const mapStateToProps = (reducer) => {
  return {
    user_loged_in: reducer.user_loged_in
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ManePage);
