import React from 'react';
import { Error } from './Error';

export const Email = ({ value, onChangeInput, errors }) => (
  <p>
    <label>Email:</label>
    <input value={value} type="email" name="email" onChange={onChangeInput} />
    {errors['email'] && <Error>{errors['email']}</Error>}
  </p>
);
