import React from 'react';
import { connect } from 'react-redux';

class ImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.close = this.close.bind(this);
    this.delete = this.delete.bind(this);
  }
  close(event){ this.props.image_modal_visibility(); }
  delete(event){ this.props.delete_image(this.props.img_source, this.props.user_id, this.props.userName); }

  render() {


    return (
      <div style={{ backgroundColor:'#DDD', width:'400px', height:'300px' }}>
         <img width='90%' alt='alt' src={ this.props.img_source }/>
         <button onClick={this.close} >close</button>
         <button onClick={this.delete} >delete this image</button>
      </div>
    );
  }
}


const mapStateToProps = (reducer) => {
  return {
     img_source: reducer.img_source,
     user_id: reducer.user_id,
     userName: reducer.userName
   }
};

const mapDispatchToProps = dispatch => ({
  image_modal_visibility: () => dispatch({ type: 'DONT_SHOW_IMAGE_MODAL' }),
  delete_image: (source, user_id, userName) => dispatch({ type: 'DELETE_IMAGE_SAGA', values: { source, user_id, userName } })
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);
