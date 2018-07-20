import React from "react";

export const Age = props => (
  <p>
    <label>Age:</label>
    <input
      value={props.age}
      type="text"
      name="age"
      onChange={props.onChangeInput}
    />
  </p>
);
