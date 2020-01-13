import React from 'react';
//import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    width: '70%',
    minWidth: '200px'
  }
})

class PasswordField extends React.Component {

  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {

    const {
      classes: {
        root
      },
      field: {
        value,
        onChange
      },
      form: {
        errors,
        touched
      }
    } = this.props;

    const {
      showPassword
    } = this.state;

  //  console.log("value: ",value);
    return (
        <TextField
          InputLabelProps={{ shrink: true }}
          className = { root }
          name = "password"
          id = "outlined-adornment-password"
          variant = "outlined"
          type = { showPassword ? 'text' : 'password' }
          label = "Password"
          margin="normal"
          value = { value }
          onChange = { onChange }
          placeholder = "Password"
          error = { Boolean(touched.password && errors.password) }
          helperText = { Boolean(touched.password && errors.password) ? errors.password : '' }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={ this.handleClickShowPassword }
                >
                  { showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    );
  }
}

PasswordField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordField);
