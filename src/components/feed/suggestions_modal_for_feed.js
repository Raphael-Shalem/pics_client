import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import DefaultAvatar from '../graphic_components/default_avatar.png';
import Loader from '../graphic_components/loader';

 const styles = {
   comp: {
     backgroundColor: '#40404F',
     border: `1px solid #667`,
     marginBottom: `30px`,
     padding: `80px`,
   },
   p: {
      color:'#445'
   },
   p2: {
      color:'#BBC',
      marginBottom: '30px'
   }
 }



const SuggstionsModal = (props) => {

  const set_other_user = (user) => { props.get_paths_for_other_user(user); }

  const Default = () => {
     return(
       <div style={{
         position:'absolute',
         left: '50%',
         transform: `translate(-50%, 0%)`
       }}>
         <Loader/>
       </div>
       )
     }

  const MakeUsers = () => <> {
      props.suggested_users.map((user, index) => {
        return(
          <div key={ index }>
            <div
             style={{
                 width: props.size > 600 ? '50%' : '95%',
                 display: 'grid',
                 gridTemplateColumns: '1fr 2fr',
                 backgroundColor: '#BABACE',
                 padding: '20px',
                 marginLeft: '50%',
                 marginTop: '5px',
                 cursor: 'pointer',
                 transform: `translate(-50%, 0%)`
             }}
             onClick={ e => set_other_user(user) }
           >
                <Avatar style={{ width:'55px', height:'55px' }}
                        alt="avatar"
                        src={ user.avatar ? user.avatar : DefaultAvatar }
                />
               <p style={ styles.p }>
                 {user.userName}
               </p>
            </div>
          </div>
        )
      }
  )} </>

  const Users = props.suggested_users && props.suggested_users.length ? MakeUsers : Default;

  return (
    <div style={ styles.comp }>
       <p style={ styles.p2 }>{`you currently aren't following anyone. Here are some suggestions:`}</p>
       <Users/>
    </div>
  );
}

//

const mapStateToProps = (reducer) => {
  return {
    user_id: reducer.user_id,
    open_suggstions_modal: reducer.open_suggstions_modal,
    suggested_users: reducer.suggested_users_for_feed

   }
};

const mapDispatchToProps = dispatch => ({
  get_paths_for_other_user: (user) => dispatch({ type: 'GET_PATHS_FOR_OTHER_USER_SAGA', value: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggstionsModal);
