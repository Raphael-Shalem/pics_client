import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddPicModal from '../modals/add_pic_modal';
import SearchModal from '../modals/search_modal';
import SuggestionshModal from '../modals/suggestions_modal';
// import SuggestionshModal2 from '../other_user/suggestions_modal_2';
import MyAccountModal from '../modals/my_account_modal';
import HelpModal from '../modals/help_modal';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import MyTheme from '../../theme';


const styles = {
  root: {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '10vh',
    backgroundColor: '#2B2B35',
    boxShadow: '0px 0px 6px #191919',
    zIndex: 10,
  },
  grid: {
    margin: "auto",
    marginTop: "40px",
    width: '28%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  }
};


const NavBar = (props) => {

    const grid_width = props.size > 900 ? 28 : 50;

    const get_rid_of_other_user = () => {
      if (props.other_user) { props.empty_other_user_object() }
    }

    return (
      <div style={ styles.root }>
          <HelpModal size={ props.size }/>
          <MyAccountModal size={ props.size }/>
          <div style={{
                margin: "auto",
                marginTop: "40px",
                width: `${grid_width}%`,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr'
              }}
          >
             {
               (props.other_user.paths && <Link to='/FeedPage' onClick={ get_rid_of_other_user }><HomeIcon style={ MyTheme.icon }/></Link>) ||
               (props.profile_page_mark && <Link to='/FeedPage' onClick={ get_rid_of_other_user }><HomeIcon style={ MyTheme.icon }/></Link>) ||
               (props.feed_page_mark && <Link to='/ProfilePage' onClick={ get_rid_of_other_user }><PersonIcon style={ MyTheme.profile_icon }/></Link>)
             }
             <AddPicModal size={ props.size }/>
             <SearchModal size={ props.size }/>
             <SuggestionshModal size={ props.size }/>
          </div>
      </div>
    );

}

const mapStateToProps = (reducer) => {
  return {
    feed_page_mark: reducer.feed_page_mark,
    profile_page_mark: reducer.profile_page_mark,
    other_user: reducer.other_user
  };
};

const mapDispatchToProps = dispatch => ({
  empty_other_user_object: () => dispatch({ type: 'EMPTY_OTHER_USER_OBJECT', value: { skip: 'skip' } })
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


//
