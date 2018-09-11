import React from 'react';
import { Error } from './Error';

export const Password = ({ value, onChangeInput, errors }) => (
  <p>
    <label>Password:</label>
    <input
      value={value}
      type="password"
      name="password"
      onChange={onChangeInput}
    />
    {errors['password'] && <Error>{errors['password']}</Error>}
  </p>
);
