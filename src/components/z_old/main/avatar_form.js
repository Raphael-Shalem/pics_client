import React from "react";
import { connect } from "react-redux";


class AvatarForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      user_id: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete_avatar = this.delete_avatar.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    let avatar = this.state.file;
    let user_id = this.props.user_id;
    let userName = this.props.userName;
    let avatarName = this.props.avatar;

    console.log('avatar :  ',avatar,' user_id :  ', user_id, ' userName :  ',userName, ' avatarName :  ',avatarName  );


    this.props.upload_avatar(avatar, user_id, userName, avatarName);
    this.props.dont_show_avatar_form();
  }

  onChange(event) { this.setState({ file:event.target.files[0] }); }
  cancel(event) { this.props.dont_show_avatar_form() }

  delete_avatar(event) {
    let user_id = this.props.user_id;
    let userName = this.props.userName;
    let avatarName = this.props.avatar;
    this.props.delete_avatar(avatarName, userName, user_id);
    this.props.dont_show_avatar_form();
  }


  render() {

    let show_sub_button = this.state.file===null?0:1;
    let del_button_visibility = this.props.avatar.length?'inline':'none';

    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <br/><br/>
          <input type="file" name='avatar' onChange={ this.onChange }/>
          <br/><br/>
          <button type="submit" style={{ opacity:show_sub_button }}>submit</button>
        </form>
        <br/><br/>
        <button style={{ display:del_button_visibility }} onClick={ this.delete_avatar }>delete avatar</button>
        <br/><br/>
        <button onClick={ this.cancel }>cancel</button>
      </div>
    );
  }
}
//

const mapStateToProps = (reducer) => {
  return {
     user_id: reducer.user_id,
     userName: reducer.userName,
     avatar: reducer.avatar
   }
};

const mapDispatchToProps = dispatch => ({
  upload_avatar: (avatar, user_id, userName, avatarName) => dispatch({ type: 'UPLOAD_AVATAR_SAGA', image_values: { avatar, user_id, userName, avatarName } }),
  dont_show_avatar_form: () => dispatch({ type: 'DONT_SHOW_AVATAR_FORM' }),
  delete_avatar: (avatarName, userName, user_id) => dispatch({ type: 'DELETE_IMAGE_SAGA', values: { avatarName, userName, user_id } })
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarForm);




//window.local storage. user id
