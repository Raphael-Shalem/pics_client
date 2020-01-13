import React from "react";
import { connect } from "react-redux";
//

class AddPicForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      user_id: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    let pic = this.state.file;
    let user_id = this.props.user_id;
    let userName = this.props.userName;

    this.props.upload_image(pic, user_id, userName);

  }

  onChange(event) { this.setState({ file:event.target.files[0] }); }

  render() {

    let show_button = this.state.file===null?0:1;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="file" name='pic' onChange={ this.onChange }/><br/>
          <button type="submit" style={{ opacity:show_button }}>submit</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (reducer) => {
  return {
     user_id: reducer.user_id,
     userName: reducer.userName
   }
};

const mapDispatchToProps = dispatch => ({
  upload_image: (pic, user_id, userName) => dispatch({ type: 'UPLOAD_IMAGE_SAGA', image_values: { pic, user_id, userName } })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPicForm);




//window.local storage. user id
