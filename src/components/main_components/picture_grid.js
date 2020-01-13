import React from "react";
import { connect } from 'react-redux';
import ImageModal from '../modals/image_modal';
import Loader from '../graphic_components/loader';

const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080'

const styles = {
  grid: {
    display: 'grid',
    padding: '10px',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '5px',
    gridRowGap: '10px'
  }
};




const PictureGrid = (props) => {

  const [state, setState] = React.useState({ paths: null, isLoading: true })

  React.useEffect(() => {
      if ( state.paths !== props.paths ) { setState({ paths: props.paths, isLoading: false }) }
    },[state.paths, props.paths]
  )

  const { isLoading, paths } = state;

  const root_width = props.size[0] > 900 ? 66 : 100;
  const picSize = props.size[0] > 900 ? props.size[0] / 100 * 66 / 3.166 : props.size[0] / 3.166;

  if (isLoading) { return ( <Loader/> ); }

  return (
    <div style={{
        margin: 'auto',
        marginTop: '10vh',
        width: `${root_width}%`
      }}
      >
      <div style={ styles.grid }>
        { paths.map((src, index) =>
          <div
            key={`pic_div_${index}`}
            style={{
                    cursor: 'pointer',
                    height: `${picSize}px`,
                    width: `${picSize}px`,
                    overflow:'hidden'
                  }}
          >
            <ImageModal my_src={ `${host}/${src.path}` } my_height={ src.height } my_width={ src.width } picSize={ picSize } size={ props.size }/>
          </div>
        )}
      </div>
    </div>
  );

}


const mapStateToProps = ({
  paths,
  user_id,
  userName,
  //user_loged_in,
//  avatar
}) => ({
    paths,
    user_id,
    userName,
//    user_loged_in,
//    avatar
});

const mapDispatchToProps = dispatch => ({
//  requestImagesForUser: (user_id, userName, avatar) => dispatch({ type: 'REQUEST_IMAGES_FOR_USER_SAGA', values: { user_id, userName, avatar } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
