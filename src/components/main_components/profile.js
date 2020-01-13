import React from "react";
import AvatarModal from '../modals/avatar_modal';


const styles = {
  root: {
    heigth: '30vh',
    top: '10vh',
    width: '100vw',
  },
  profile: {
    margin: 'auto',
    paddingTop: '130px'
  }
}

const Profile = (props) => {

    return (
      <div style={ styles.root }>
          <div style={ styles.profile }>
            <AvatarModal size={ props.size }/>
          </div>
      </div>
    );

}


export default Profile;


//
