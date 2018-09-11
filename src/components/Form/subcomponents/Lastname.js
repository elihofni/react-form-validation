import React from 'react';
import { Error } from './Error';

export const Lastname = ({ value, onChangeInput, errors }) => (
  <p>
    <label>Sobrenome:</label>
    <input value={value} type="text" name="lastname" onChange={onChangeInput} />
    {errors['lastname'] && <Error>{errors['lastname']}</Error>}
  </p>
);
