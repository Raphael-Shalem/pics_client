import React from "react";
import { connect } from 'react-redux';
import ImageModal from '../modals/image_modal';
import Loader from '../graphic_components/loader';

//const host = process.env.NODE_ENV === 'production' ? 'https://raphael-pics-server.herokuapp.com' : 'http://localhost:8080'

const styles = {
  grid: {
  //  width: '99%',
    display: 'grid',
    padding: '2px',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '10px',
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

  const root_width = props.size[0] > 900 ? 66 : 99;
  const picSize = props.size[0] > 900 ? props.size[0] / 100 * 66 / 3.166 : props.size[0] / 3.166 - 30;
  const image_container_height = props.size[0] > 900 ? picSize : props.size[0]/3;
  if (isLoading) { return ( <Loader/> ); }

  return (
    <div style={{
        margin: 'auto',
        marginTop: '10vh',
        width: `${root_width}%`
      }}
      >
      <div style={ styles.grid }>
        { (props.show_picture_grid_loader === 1) &&
          ( <div style={{
               height: `${picSize}px`,
               width: `${picSize}px`,
               backgroundColor: '#CCD'

            }}>
            <div style={{
              width:'40px',
              height:'40px',
              marginTop: '50%',
              marginLeft: '50%',
              transform: `translate(-50%, -50%)`

            }}>
              <Loader size="100"/>
            </div>
           </div> )
        }
        { paths.map((src, index) =>
          <div key={`pic_div_${index}`} style={{ height: image_container_height }}>
            <div
              style={{
                      cursor: 'pointer',
                      height: `${picSize}px`,
                      width: `${picSize}px`,
                      overflow:'hidden',
                      marginTop: '50%',
                      marginLeft: '50%',
                      transform: `translate(-50%, -50%)`
                    }}
            >
             <ImageModal my_src={ src.path } my_height={ src.height } my_width={ src.width } picSize={ picSize } size={ props.size }/>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}



const mapStateToProps = (reducer) => {
  return {
     paths: reducer.paths,
     user_id: reducer.user_id,
     userName: reducer.userName,
     show_picture_grid_loader: reducer.show_picture_grid_loader
   }
};


const mapDispatchToProps = dispatch => ({
//  requestImagesForUser: (user_id, userName, avatar) => dispatch({ type: 'REQUEST_IMAGES_FOR_USER_SAGA', values: { user_id, userName, avatar } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
