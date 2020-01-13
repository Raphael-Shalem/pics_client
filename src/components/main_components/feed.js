import React from "react";
import { connect } from 'react-redux';
import ImageModalForFeed from '../feed/image_modal_for_feed';
import AvatarModalForFeed from '../feed/avatar_modal_for_feed';
import SuggestionsModalForFeed from '../feed/suggestions_modal_for_feed'

//
const styles = {
  label: {
    width: '100%',
    backgroundColor: '#40404F',
    padding: '20px 0 5px 0'
  },
  grid: {
    width: '90%',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '0px',
    gridRowGap: '0px'
  },
  comp: {
    marginBottom: `30px`,
  },
  p: {
    color: '#99A'
  },
  pic: {
    width: '100%',
  }
};

const Feed = (props) => {

  const { feed, get_suggestions } = props;

   React.useEffect(() => {
       if (feed) { get_suggestions(); }
     },[feed, get_suggestions]
   )

   const root_width = props.size > 900 ? 45 : (props.size > 600 ? 75 : 98);

  return (
    <div style={{
          margin: 'auto',
          width: `${root_width}%`,
        }}
    >
      <div>
        { feed.map((src, index) =>
          <div key={`pic_div_${index}`} style ={styles.comp}>
            <div style ={ styles.label }>
              <div style ={ styles.grid }>
                <AvatarModalForFeed feed={ src } size={ props.size }/>
                <p style={ styles.p }>{ src.creatorName }</p>
                <p style={ styles.p }></p>
              </div>
            </div>
            <div style={ styles.pic }>
              <ImageModalForFeed my_src={ `http://localhost:8080/${src.path}` }/>
            </div>
          </div>
        )}
      </div>
      { !props.feed.length ? <SuggestionsModalForFeed  size={ props.size }/> : '' }
    </div>
  );

}


const mapStateToProps = (reducer) => {
  return{
    feed: reducer.feed
  }
}

const mapDispatchToProps = dispatch => ({
  get_suggestions: () => dispatch({ type: 'REQUEST_USER_SUGGESTIONS_SAGA' , value: { skip: true }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
