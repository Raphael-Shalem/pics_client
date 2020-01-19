import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../main_components/navbar';
import PictureGrid from './picture_grid_';
import Profile from './profile_';


const ProfilePage2 = (props) => {

    React.useEffect(() => {
        if (!props.other_user) { props.history.push('/profilepage') }
      },[props.other_user, props.history]
    )

    const [size, setSize] = React.useState([500, 500]);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
      <div>
        <NavBar size={ size[0] }/>
        <Profile size={ size[0] }/>
        <PictureGrid other_user={ props.other_user } size={ size }/>
      </div>
    );
}


const mapStateToProps = (reducer) => {
  return {
    other_user: reducer.other_user
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage2);
