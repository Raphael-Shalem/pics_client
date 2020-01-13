import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles= theme => ({
  root: {
    width: '70%',
    minWidth: '200px'
  }
})

class NameField extends React.Component {

  state = {};

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

    return (
      <TextField
        InputLabelProps={{ shrink: true }}
        className = { root }
        name = "username"
        id="username"
        label="User Name"
        type="username"
        autoComplete="username"
        margin="normal"
        variant="outlined"
        value = { value }
        onChange = { onChange }
        placeholder = "User Name"
        error = { Boolean(touched.username && errors.username) }
        helperText = { Boolean(touched.username && errors.username) ? errors.username : '' }
      />
    );
  }
}

NameField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NameField);

/*


    */
