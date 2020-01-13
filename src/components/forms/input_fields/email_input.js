import React from 'react';
//import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles= theme => ({
  root: {
    width: '70%',
    minWidth: '200px'
  }
})

class EmailField extends React.Component {

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
          name = "email"
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value = { value }
          onChange = { onChange }
          placeholder = "Email"
          error = { Boolean(touched.email && errors.email) }
          helperText = { Boolean(touched.email && errors.email) ? errors.email : '' }
        />
    );
  }
}

EmailField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailField);
