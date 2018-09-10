import React from 'react';

export const Lastname = props => (
  <p>
    <label>Sobrenome:</label>
    <input
      value={props.lastname}
      type="text"
      name="lastname"
      onChange={props.onChangeInput}
    />
  </p>
);
