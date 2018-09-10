import React from 'react';

export const Email = props => (
  <p>
    <label>Email:</label>
    <input
      value={props.email}
      type="email"
      name="email"
      onChange={props.onChangeInput}
    />
  </p>
);
