import { call, take, put, /*fork,*/ all } from 'redux-saga/effects';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';


const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080'

//sighnup_request - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function* sighnup_request() {
  while(true) {
    try {
      const userInput = yield take('SIGNUP_REQUEST_SAGA');
      const response = yield call(axios.post,`${host}/api/db/make_new_user`, {
          userName: userInput.signup_values.username,
          userEmail: userInput.signup_values.email,
          userPassword: userInput.signup_values.password
        }
      );
      const { token, token2, user_already_exists, user_id, userName } = response.data;
      if (user_already_exists) {
        yield put({type: 'BAD_SIGNUP_REQUEST', payload: { user_already_exists: user_already_exists } })
      }
      else {

        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);

        localStorage.setItem('interactions', token2);
        setAuthorizationToken(token2);

        yield put({ type: 'SET_USER', payload: {
           user_id: user_id,
           userName: userName,
           first_entry: true
         }
       })

        yield put({ type: 'SET_INTERACTIONS', payload: {
            followers: [],
            following: [],
            feed: []
         }
       })
      }
    }
    catch(err) {
      console.log('err  :  '+err);
    }
    finally {}
  }
}


//login_request - - - - - - - - - - - - - - - -  _ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function* login_request() {
  while(true) {
    try {
      const userInput = yield take('LOGIN_REQUEST_SAGA');
      const response = yield call(axios.post,`${host}/api/db/authenticate_user`, {
          userEmail: userInput.login_values.email,
          userPassword: userInput.login_values.password
        }
      );

      const { token, token2, successful_login, user_id, userName, paths, followers, following, feed } = response.data;

      if (!successful_login) {
        yield put({type: 'BAD_LOGIN_REQUEST' })
      }
      else {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);

        localStorage.setItem('interactions', token2);
        setAuthorizationToken(token2);

        yield put({ type: 'SET_USER', payload: {
           user_id: user_id,
           userName: userName,
           paths: paths
           }
         })
         yield put({ type: 'SET_INTERACTIONS', payload: {
            followers: followers,
            following: following,
            feed: feed || []
          }
        })
        yield put({type:'REQUEST_USER_AVATAR_SAGA', user_id: user_id })
      }
    }
    catch(err) {
      console.log('err  :  '+err);
    }
    finally {}
  }
}



//upload image- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* upload_image() {
  while(true) {
    try {
      const userInput = yield take('UPLOAD_IMAGE_SAGA');
      const formData = new FormData();
    //  ["pic","user_id","userName"].forEach(field => formData.append(field, userInput.image_values[field]);
      formData.append('pic',userInput.image_values.pic);
      formData.append('user_id', userInput.image_values.user_id);
      formData.append('userName', userInput.image_values.userName);
      formData.append('avatar', userInput.image_values.avatar);
      formData.append('time', new Date().toISOString());

      const config = {
         headers: {
         'content-type': 'multipart/form-data',
         }
      };

      yield call(
        axios.post,
        `${host}/api/db/upload_pic`,
        formData,
        config
      );


      yield put({type: 'REQUEST_IMAGES_FOR_USER_SAGA' , values: {
         user_id: userInput.image_values.user_id,
         userName: userInput.image_values.userName,
    //     avatar: userInput.image_values.avatar
       }
     })
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}



//delete image- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function* delete_image() {
  while(true) {
    try {
      const userInput = yield take('DELETE_IMAGE_SAGA');

      const{ user_id, userName } = userInput.values;
      const avatarName = userInput.values.avatarName ? userInput.values.avatarName : '';
      const source = userInput.values.source ? userInput.values.source : '';

      const result = yield call(
        axios.post,
        `${host}/api/db/delete_image`, {
          source : source,
          user_id : user_id,
          avatarName: avatarName
        }
      );

      const { successful_deletion } = result.data;

      if (!successful_deletion) { console.log('unsuccessful_deletion!'); }
      else {
       if(avatarName.length){
         localStorage.setItem('avatar', '');
         yield put({ type: 'SET_AVATAR', payload: { avatar: '' } })
       }
       else{ yield put({ type: 'REQUEST_IMAGES_FOR_USER_SAGA', values: { user_id, userName } }) }
      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}



// get new paths and set user - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* get_new_paths() {
  while(true) {
    try {
      const userInput = yield take('REQUEST_IMAGES_FOR_USER_SAGA');
      const result = yield call(
        axios.post,
        `${host}/api/db/update_profile_page_path_list`, {
          user_id : userInput.values.user_id,
          userName : userInput.values.userName,
          avatar : userInput.values.avatar
        }
      );

      const { token, successful_update, user_id, userName, paths } = result.data;
      if (!successful_update) {
        yield put({type: 'BAD_UPDATE_REQUEST' })
      }
      else {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        yield put({ type: 'SET_USER', payload: {
             user_id: user_id,
             userName: userName,
             paths: paths,
           }
        })
      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}




// get paths for other user - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* get_paths_for_other_user() {
  while(true) {
    try {
      const input = yield take('GET_PATHS_FOR_OTHER_USER_SAGA');

      const result = yield call(
        axios.post,
        `${host}/api/db/get_paths_for_other_user`, {
          user_id : input.value.user._id,
        }
      );

      const { successful_update, paths } = result.data;

      if (!successful_update) {
        console.log('BAD_UPDATE_REQUEST')
      }
      else {

        let other_user = input.value.user;
        other_user.paths = paths;

        yield put({ type: 'SET_OTHER_USER', payload: {
             other_user: other_user
           }
        })

         yield put({ type: 'SWITCH_PROFILE', payload: {}
         })

      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}





// get paths for other user - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*

function* get_other_user_info() {
  while(true) {
    try {
      const input = yield take('GET_OTHER_USER_INFO_SAGA');

      const result = yield call(
        axios.post,
        '${host}/api/db/get_paths_for_other_user', {
          user_id : input.value.user,
        }
      );

      const { successful_update, paths } = result.data;

      if (!successful_update) {
        console.log('BAD_UPDATE_REQUEST')
      }
      else {

        let other_user = { user_id: input.value.user };
        other_user.paths = paths;
console.log('other_user  :  ',other_user)
        yield put({ type: 'SET_OTHER_USER', payload: {
             other_user: other_user
           }
        })

      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}


*/

// follow other user - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* follow_other_user() {
  while(true) {
    try {
      const input = yield take('FOLLOW_OTHER_USER_SAGA');
      const { user_id, other_user_id, following, followers, other_user_followers } = input.values;
      const result = yield call(
        axios.post,
        'http://localhost:8080/api/db/follow_other_user', {
          user_id, other_user_id, following, followers, other_user_followers
        }
      );

       const successful_update = result && result.data && result.data.successful_update;

       const { token2, new_following, new_other_user_followers, feed } = result.data;

       localStorage.setItem('interactions', token2);
       setAuthorizationToken(token2);

       yield put({ type: 'SET_INTERACTIONS', payload: {
         following,
         followers,
         feed
         }
       })

       console.log("successful_update: ",successful_update)


      if (successful_update) {
        yield put({ type: 'FOLLOW_OTHER_USER', payload: { new_following, new_other_user_followers } });
        yield put({ type: 'TOGGLE_LOADER' });
      }
      else {
        console.warn('BAD_UPDATE_REQUEST')
      }

    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}



//upload avatar- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function* upload_avatar() {
  while(true) {
    try {
      const userInput = yield take('UPLOAD_AVATAR_SAGA');
      const formData = new FormData();

    //  ["pic","user_id","userName"].forEach(field => formData.append(field, userInput.image_values[field]);
      formData.append('avatar',userInput.image_values.avatar);
      formData.append('user_id', userInput.image_values.user_id);
      formData.append('userName', userInput.image_values.userName);
      formData.append('avatarName', userInput.image_values.avatarName);

      const config = {
         headers: {
         'content-type': 'multipart/form-data',
         }
      };
      yield call(
        axios.post,
        'http://localhost:8080/api/db/upload_avatar',
        formData,
        config
      );

      yield put({type:'REQUEST_USER_AVATAR_SAGA', user_id: userInput.image_values.user_id})
     }

    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}




//- update_avatar_path - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 ///THIS IS BUGGY

function* update_avatar_path() {
  while(true) {
    try {
      const userInput = yield take('REQUEST_USER_AVATAR_SAGA');
      const result = yield call(
        axios.post,
        'http://localhost:8080/api/db/update_avatar_path', {
        user_id : userInput.user_id,
        }
      );

      const { successful_update, avatar } = result.data;

      if (!successful_update) {
        console.log('BAD_UPDATE_REQUEST')
      }
      else {
        localStorage.setItem('avatar', avatar);
        yield put({ type: 'SET_AVATAR', payload: { avatar: avatar } })
      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}



//search for user- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* search_for_user() {
  while(true) {
    try {
      const userInput = yield take('SEARCH_FOR_USER_SAGA');
      const { user_input, skip } = userInput.value;

      const result = yield call(
        axios.post,
        'http://localhost:8080/api/db/search_for_user', {
          user_input : user_input
        }
      );

      const { users, successful_res } = result.data;
      console.log(result.data)


      if (!successful_res) { console.log('unsuccessful_respons!'); }
      else {
         if (!skip) {
            yield put({ type: 'SUGGEST_USERS', payload: { users: users }  })
          }
         else {
            yield put({ type: 'SET_OTHER_USER', payload: {
                 other_user: users,
                 skip: skip
               }
            })
         }
      }
    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}




//get user suggestions- - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function* suggest_users() {
  while(true) {
    try {
      const input = yield take('REQUEST_USER_SUGGESTIONS_SAGA');
      const { skip } = input.value || 0;
      const result = yield call(
        axios.post,
        'http://localhost:8080/api/db/suggest_users'
      );

      const { successful_res, users } = result.data;

      if (!successful_res) { console.log('unsuccessful_respons!'); }
      else {
        if (skip) {
           yield put({ type: 'SUGGEST_USER_FOR_FEED', payload: { users: users }  })
         }
        else {
          yield put({ type: 'SUGGEST_USERS', payload: { users: users }  })
        }
      }

    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}






//delete user account- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function* delete_user() {
  while(true) {
    try {
      const userInput = yield take('DELETE_USER_SAGA');
      const{ user_id, avatar } = userInput.values;

      const result = yield call(
        axios.post,
        'http://localhost:8080/api/db/delete_user', {
          user_id : user_id,
          avatar: avatar
        }
      );

      const { successful_deletion } = result.data;

      if (!successful_deletion) { console.log('unsuccessful_deletion!'); }
       else{ yield put({ type: 'LOG_OUT' }) }

    }
    catch (err) { console.log('err  :  '+err); }
    finally {}
  }
}





//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function* indexSaga(){
  yield all([
  //  call(cookie_test),
    call(sighnup_request),
    call(login_request),
    call(upload_image),
    call(delete_image),
    call(get_new_paths),
    call(get_paths_for_other_user),
  //  call(get_other_user_info),
    call(upload_avatar),
    call(update_avatar_path),
    call(search_for_user),
    call(follow_other_user),
    call(suggest_users),
    call(delete_user)
  ])
}

















//'COOKIE_TEST_SAGA'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*
function* cookie_test() {
  while(true) {
    try {
      yield take('COOKIE_TEST_SAGA');
      console.log('saga dispached');
      const result = yield call(
        axios.get,
        'http://localhost:8080/api/db/cookie_test'//,
      //  { withCredentials: true }
      );
      console.log('result');
      console.log(result);
    }
    catch (err) { console.log('err  :  '+err); }
    finally { }
  }
}
*/
