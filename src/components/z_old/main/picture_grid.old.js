import React from "react";
import { connect } from 'react-redux';
import ImageModal from '../modals/image_modal';

const styles = {
  root: {
    //backgroundColor:'#DDD',
    position:'absolut',
    margin: "auto",
    width: '600px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '20px',
    gridRowGap: '20px'
  },
  pic: {
    overflow:'hidden',
    height:'170px',
    textAlign:'center'
  }
};

class PictureGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      paths: null,
      isLoading:true
    }

    this.onClick = this.onClick.bind(this);

    if (props.user_loged_in ) { props.requestImagesForUser(props.user_id, props.userName, props.avatar); }
  }

  onClick(event){ this.props.show_img_modal(event.target.src) }

  static getDerivedStateFromProps(nextProps, state) {

    if (nextProps.paths !== state.paths) {
      return {
          ...state,
          paths: nextProps.paths,
          isLoading: false
      }
    }
    return null;
  }


  render() {
    const {
      isLoading,
      paths
    } = this.state;

    if (isLoading) {
      return (
        <div>loading...</div>
      );
    }


    return (
      <div style={ styles.root }>
        <div style={ styles.grid }>
          { paths.map((src, index) =>
            <div key={`pic_div_${index}`} style={ styles.pic }>
              <ImageModal
               img_src={ `http://localhost:8080/${src.path}` }
               user_id = { props.user_id }
               userName = { props.userName }
              />
            </div>
          )}
        </div>
     </div>
    );
  }
}


const mapStateToProps = ({
  paths,
  user_id,
  userName,
  user_loged_in,
  avatar
}) => ({
    paths,
    user_id,
    userName,
    user_loged_in,
    avatar
});

const mapDispatchToProps = dispatch => ({
  requestImagesForUser: (user_id, userName, avatar) => dispatch({ type: 'REQUEST_IMAGES_FOR_USER_SAGA', values: { user_id, userName, avatar } }),
  show_img_modal: source => dispatch({ type: 'SHOW_IMAGE_MODAL', source })
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
