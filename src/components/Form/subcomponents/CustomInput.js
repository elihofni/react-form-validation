import React from 'react';
import { Error } from './Error';

export const CustomInput = ({
  value,
  onChangeInput,
  errors,
  label,
  type,
  name,
}) => (
  <p>
    <label>{label}</label>
    <input value={value} type={type} name={name} onChange={onChangeInput} />
    {errors[name] && <Error>{errors[name]}</Error>}
  </p>
);
