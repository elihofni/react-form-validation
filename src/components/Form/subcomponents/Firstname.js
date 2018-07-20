import React from "react";

export const Firstname = props => (
  <p>
    <label>Nome:</label>
    <input
      value={props.firstname}
      type="text"
      name="firstname"
      onChange={props.onChangeInput}
    />
  </p>
);
