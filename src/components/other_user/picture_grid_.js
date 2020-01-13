import React from "react";
import ImageModal from '../modals/image_modal_2';

const styles = {
  grid: {
    display: 'grid',
    padding: '10px',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '5px',
    gridRowGap: '10px'
  }
};

const PictureGrid_ = (props) => {

  const paths = props.other_user.paths || [];

  const root_width = props.size[0] > 900 ? 66 : 100;
  const picSize = props.size[0] > 900 ? props.size[0] / 100 * 66 / 3.166 : props.size[0] / 3.166;

  return (
    <div style={{
          margin: 'auto',
          marginTop: '10vh',
          width: `${root_width}%`,
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
            <ImageModal my_src={ `http://localhost:8080/${src.path}` } my_height={ src.height } my_width={ src.width } picSize = {picSize} size={ props.size }/>
          </div>
        )}
      </div>
    </div>
  );

}

export default PictureGrid_;
































// import React from "react";
// import { connect } from 'react-redux';
// import ImageModal from '../modals/image_modal';
// import Loader from '../graphic_components/loader';
//
// const styles = {
//   root: {
//     margin: 'auto',
//     marginTop: '10vh',
//     width: '66%',
//   },
//   grid: {
//     display: 'grid',
//     padding: '10px',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gridColumnGap: '5px',
//     gridRowGap: '10px'
//   },
//   pic: {
//     cursor: 'pointer',
//     height: '300px',
//     width: '300px',
//     overflow:'hidden'
//   }
// };
//
//
// const PictureGrid = (props) => {
//
//
//   const [state, setState] = React.useState({ paths: [], _id: props.other_user._id, isLoading: true })
//
//   const handleSetState = () => {
//     console.log('props.other_user._id : ',props.other_user._id)
//
//     num++;
//     console.log('num ',num)
//      setState({
//         paths: props.other_user.paths,
//         _id: props.other_user._id,
//         isLoading: false
//       });
//    };
//   const setState_cb = React.useCallback(handleSetState);
//
//   React.useEffect(() => {
//       let act = false;
//       if (!state.paths || !props.other_user.paths) { act = true; }
//
//       if ( state.paths && props.other_user.paths && state.paths.length !== props.other_user.paths.length ) {
//         act = true;
//       }
//       if (act) {
//           props.requestImagesForUser(props.other_user._id);
//           setState_cb()
//       }
//     //  if ( props._id !== props.other_user._id ) { props.requestImagesForUser(props.other_user._id); }
//    }
//     ,[props.requestImagesForUser, props.other_user._id, state.paths, props.other_user.paths, setState_cb]
//   )
//
//   const { isLoading, paths } = state;
//
//
//
//   if (isLoading) { return ( <Loader/> ); }
//
//   return (
//     <div style={ styles.root }>
//       <div style={ styles.grid }>
//       { (paths) && (paths.map((src, index) =>
//         <div key={`pic_div_${index}`} style={ styles.pic }>
//           <ImageModal my_src={ `http://localhost:8080/${src.path}` } my_height={ src.height } my_width={ src.width }/>
//         </div>
//         )
//       )}
//       </div>
//     </div>
//   );
//
// }
//
//
// const mapStateToProps = (reducer) => {
//   return {
//     other_user: Object.assign({},reducer.other_user)
//   };
// };
//
//
// const mapDispatchToProps = dispatch => ({
// //  requestImagesForUser: (user_id) => dispatch({ type: 'REQUEST_IMAGES_FOR_OTHER_USER_SAGA', values: { user_id } })
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
//
//
//
//
//
// /*
// return (
//   <div style={ styles.root }>
//     <div style={ styles.grid }>
//       { paths.map((src, index) =>
//         <div key={`pic_div_${index}`} style={ styles.pic }>
//           <ImageModal my_src={ `http://localhost:8080/${src.path}` } my_height={ src.height } my_width={ src.width }/>
//         </div>
//       )}
//     </div>
//   </div>
// );*/
