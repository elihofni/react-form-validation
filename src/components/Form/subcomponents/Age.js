import React from 'react';
import { Error } from './Error';

export const Age = ({ value, onChangeInput, errors }) => (
  <p>
    <label>Age:</label>
    <input value={value} type="text" name="age" onChange={onChangeInput} />
    {errors['age'] && <Error>{errors['age']}</Error>}
  </p>
);
