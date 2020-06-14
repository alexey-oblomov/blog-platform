/* eslint-disable react/prop-types */
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export function CustomizedInputPassword(props) {
  const {errors, touched, values, name, onChange, onBlur, label, labelWidth, required} = props;

  const [state, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !state.showPassword,
    });
  };

  return (
    <FormControl size="small" variant="outlined" error={!!touched[name] && !!errors[name]}>
      <InputLabel htmlFor="outlined-adornment-password" required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        size="small"
        type={state.showPassword ? 'text' : 'password'}
        value={values[name]}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={labelWidth}
      />
    </FormControl>
  );
}
