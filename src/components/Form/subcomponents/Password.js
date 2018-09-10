import React from 'react';

export const Password = props => (
  <p>
    <label>Password:</label>
    <input
      value={props.password}
      type="password"
      name="password"
      onChange={props.onChangeInput}
    />
  </p>
);
