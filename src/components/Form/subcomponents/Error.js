import React from 'react';

const style = {
  color: 'red',
};

export const Error = ({ children }) => (
  <span style={style}>{children.join(' ')}</span>
);
