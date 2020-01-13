import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../main_components/navbar';
import Feed from '../main_components/feed';


const FeedPage = (props) => {

  let {
        history,
        user_loged_in,
        switch_profile,
        switch_profile_zero,
        mark_feed_page,
        go_to_profile_page
      } = props;

  React.useEffect(() => {
    if (user_loged_in) {
        if (switch_profile) {
            history.push('/profilepage_')
            switch_profile_zero();
        }
        else {
          if (go_to_profile_page) { history.push('/profilepage') }
          else { mark_feed_page(); }
        }
     }
     else {
       history.push('/')
     }
   },[history, user_loged_in, switch_profile, switch_profile_zero, mark_feed_page, go_to_profile_page]
  )

    const [size, setSize] = React.useState(0);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
      <div>
        <NavBar size={ size }/>
        <div style = {{marginTop:'150px'}}>
          <Feed size={ size }/>
        </div>
      </div>
    );

}

const mapStateToProps = (reducer) => {
  return {
    first_entry: reducer.first_entry,
    user_loged_in: reducer.user_loged_in,
    user_id: reducer.user_id,
    userName: reducer.userName,
    avatar: reducer.avatar,
    switch_profile: reducer.switch_profile,
    go_to_profile_page: reducer.go_to_profile_page
  };
};

const mapDispatchToProps = dispatch => ({
  mark_feed_page: () => dispatch({ type: 'MARK_FEED_PAGE' }),
  switch_profile_zero: () => dispatch({ type: 'SWITCH_PROFILE_ZERO' })
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
