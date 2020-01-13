import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const styles = {
  link:{
    textDecoration:'none',
    color:'#111'
  }
};
class AccountModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.close = this.close.bind(this);
    this.logout = this.logout.bind(this);
    this.delete = this.delete.bind(this);
  }
  close(event){ this.props.account_modal_visibility(); }
  logout(event){ this.props.logout(); }
  delete(event){ this.props.delete_account(this.props.user_id, this.props.avatar); }


  render() {
    const color = this.props.color;
    const display = this.props.display;
    return (
      <div style={{ backgroundColor:color,  display: display, width:'400px', height:'300px' }}>
         <br/><br/>
         <Link to='/' style={ styles.link } onClick={ this.logout }>LOG OUT</Link>
         <br/><br/>
         <button onClick={this.delete} >delete my account</button>
         <br/><br/>
         <button onClick={this.close} >close</button>
      </div>
    );
  }
}


const mapStateToProps = (reducer) => {
  return {
    user_id: reducer.user_id,
  //  userName: reducer.userName,
    avatar: reducer.avatar
   }
};

const mapDispatchToProps = dispatch => ({
  account_modal_visibility: () => dispatch({ type: 'DONT_SHOW_ACCOUNT_MODAL' }),
  logout: () => dispatch({ type: 'LOG_OUT' }),
  delete_account: (user_id, avatar) => dispatch({ type: 'DELETE_USER_SAGA', values: { user_id, avatar } })
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
