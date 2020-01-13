import React from 'react';
import { connect } from 'react-redux';
import AvatarForm from './avatar_form';//

class AvatarUploadModal extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {

    return (
      <div style={{ backgroundColor:'#DDD', width:'400px', height:'300px' }}>
         <AvatarForm/>
      </div>
    );
  }
}


const mapStateToProps = (reducer) => {
  return {}
};

const mapDispatchToProps = dispatch => ({
//  signup: signup_values => dispatch({ type: 'SIGNUP_REQUEST_SAGA', signup_values })
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUploadModal);
