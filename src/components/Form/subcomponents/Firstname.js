import React from 'react';
import { Error } from './Error';

export const Firstname = ({ value, onChangeInput, errors }) => (
  <p>
    <label>Nome:</label>
    <input
      value={value}
      type="text"
      name="firstname"
      onChange={onChangeInput}
    />
    {errors['firstname'] && <Error>{errors['firstname']}</Error>}
  </p>
);
