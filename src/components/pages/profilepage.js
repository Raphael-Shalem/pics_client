import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../main_components/navbar';
import PictureGrid from '../main_components/picture_grid';
import Profile from '../main_components/profile';
import SetUpModal from '../modals/set_up_modal';



const ProfilePage = (props) => {

  const [size, setSize] = React.useState([0,0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  React.useEffect(() => {
    if (props.user_loged_in) {
      if (props.switch_profile) {
         props.switch_profile_zero();
         props.history.push('/profilepage_')
      }
      else { props.mark_profile_page(); }
    }
    else {
       props.history.push('/')
     }
  },[props, props.history, props.user_loged_in, props.get_avatar, props.user_id]);

    return (

      <div>
        <NavBar size={ size[0] }/>
        <Profile size={ size[0] }/>
        <PictureGrid size={ size }/>
        { (props.first_entry) && (<SetUpModal size={ size[0] }/>) }
      </div>
    );
}


const mapStateToProps = (reducer) => {
  return {
    user_loged_in: reducer.user_loged_in,
    user_id: reducer.user_id,
    switch_profile: reducer.switch_profile,
    first_entry: reducer.first_entry

  };
};

const mapDispatchToProps = dispatch => ({
  mark_profile_page: () => dispatch({ type: 'MARK_PROFILE_PAGE' }),
  get_avatar: user_id => dispatch({ type: 'REQUEST_USER_AVATAR_SAGA', user_id}),
  switch_profile_zero: () => dispatch({ type: 'SWITCH_PROFILE_ZERO' })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
