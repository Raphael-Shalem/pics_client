
const initialState = {
   first_entry: false,
   user_loged_in: false,
   user_is_authenticated: false,
   go_to_profile_page: 0,
   profile_page_mark: 0,
   feed_page_mark: 0,
   wrong_credentials: false,
   user_already_exists: false,
   user_id: 'no user id',
   userName: 'no user name',
   avatar: '',
   following: [],
   followers: [],
   paths: [],
   feed: [],
   img_source: '',
   suggested_users: [],
   suggested_users_for_feed: [],
   search_result: '',
   open_suggstions_modal: 0,
   switch_profile: 0,
   other_user: 0,
   show_loader: 0
 };

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
// SET_USER  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

    case 'SET_USER':


        const user_id = !action.payload ? action.data.id : action.payload.user_id;
        const userName = !action.payload ? action.data.userName : action.payload.userName;
        const paths = !action.payload ? action.data.paths : action.payload.paths;
        const first_entry = !action.payload ? false : action.payload.first_entry;

        return {
          ...state,
                 first_entry: first_entry,
                 user_loged_in: true,
                 user_is_authenticated: true,
                 user_id: user_id,
                 userName: userName,
                 paths: paths || [],
               }

    case 'SET_INTERACTIONS':

         let following_arr = !action.payload ? action.data.following : action.payload.following;
         let followers_arr = !action.payload ? action.data.followers : action.payload.followers;
         let feed_arr = !action.payload ? action.data.feed : action.payload.feed;

         return {
           ...state,
                  following: following_arr || [],
                  followers: followers_arr || [],
                  feed: feed_arr || []
                }


// SET_AVATAR-     -     -     -     -     -     -     -     -

    case 'SET_AVATAR':
        const avatar = !action.payload ? action.data : action.payload.avatar;

        return {
          ...state,
          avatar: avatar || ''
        }

// SET_OTHER_USER -     -     -     -     -     -     -     -

    case 'SET_OTHER_USER':

        const { other_user, skip } = action.payload;

         if (skip) {
           return {
             ...state,
             other_user: other_user[0]
           }
         }
        return {
          ...state,
          other_user: other_user,
    //      profile_page_mark: 0,
      //    feed_page_mark: 1,
        }

// FOLLOW_OTHER_USER -     -     -     -     -     -     -     -

    case 'FOLLOW_OTHER_USER':

        const { new_other_user_followers } = action.payload;

        return {
          ...state,
          other_user: {
            ...state.other_user,
            followers: new_other_user_followers
          }
        };


//SWITCH_PROFILE  -     -     -     -     -     -     -     -


   case 'SWITCH_PROFILE':
     return {
       ...state,
       switch_profile: 1
     }
     case 'SWITCH_PROFILE_ZERO':
     return {
       ...state,
       switch_profile: 0
     }

//EMPTY_OTHER_USER_OBJECT  -     -     -     -     -     -     -     -

  case 'EMPTY_OTHER_USER_OBJECT':

     let go_to_profile_page = 1;
     if (action.value && action.value.skip === 'skip') { go_to_profile_page = 0 }

     return {
       ...state,
       other_user: 0,
       go_to_profile_page: go_to_profile_page
     }


// BAD_SIGNUP_REQUEST - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  case 'BAD_SIGNUP_REQUEST':
     return {
       ...state,
       user_already_exists: action.payload.user_already_exists
      }


//BAD_LOGIN_REQUEST - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  case 'BAD_LOGIN_REQUEST':
     return {
       ...state,
        wrong_credentials: true
     }


//SUGGEST_USERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  case 'SUGGEST_USERS':

      const users = action.payload.users;
      let search_result = 'no users found';
      if ( users.length ) { search_result = 'users found' }

      return { ...state,
               suggested_users: users,
               search_result: search_result
              }

   case 'SUGGEST_USER_FOR_FEED':

       const users_ = action.payload.users;

       return { ...state,
                suggested_users_for_feed: users_
               }
//      -      -     -      -     -      -     -      -     -      -     -      -     -      -

   case 'EMPTY_SEARCH_RESULT':

      return { ...state,
               search_result: ''
              }

//      -      -     -      -     -      -     -      -     -      -     -      -     -      -

  case 'OPEN_SUGGESTIONS_MODAL':
       return { ...state,
         open_suggstions_modal: 1
       }

//      -      -     -      -     -      -     -      -     -      -     -      -     -      -


   case 'CLOSE_SUGGESTIONS_MODAL':
       return { ...state,
         suggested_users: [],
         open_suggstions_modal: 0
       }


//LOG_OUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  case 'LOG_OUT':
      localStorage.clear();
      return { ...state,
               other_user: 0,
               go_to_profile_page: 1,
               user_loged_in: false,
               wrong_credentials: false,
               user_is_authenticated: false,
               avatar: ''
              }


  //MARK_PROFILE_PAGE / FEED_PAGE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  case 'MARK_PROFILE_PAGE':
       return { ...state,
                go_to_profile_page: 0,
                profile_page_mark: 1,
                feed_page_mark: 0,
                other_user: 0
              }

  case 'MARK_FEED_PAGE':
       return { ...state,
                profile_page_mark: 0,
                feed_page_mark: 1,
                other_user: 0
              }

  case 'TOGGLE_LOADER':
        let show_loader = 1 - state.show_loader;
        return { ...state,
                 show_loader: show_loader
               }

  case 'CANCEL_FIRST_ENTRY':
        return { ...state,
                 first_entry: false
               }

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  default: return state;
 }
}

export default reducer;













/*



case 'FOLLOW_OTHER_USER':

    const user_id_      = state.user_id,
          other_user_id = state.other_user._id;

    return {
      ...state,
      following: [...state.following, other_user_id],
      other_user: {
        ...state.other_user,
        followers: [ ...state.other_user.followers, user_id_ ]
      }
    };

    */
