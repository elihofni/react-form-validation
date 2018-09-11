import React from 'react';
import {
  Firstname,
  Age,
  Lastname,
  Email,
  Password,
  Button,
} from './subcomponents';

const Form = props => {
  const {
    value: { firstname, lastname, age, email, password },
    errors,
  } = props;
  return (
    <form>
      <Firstname
        value={firstname}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Lastname
        value={lastname}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Email
        value={email}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Age value={age} onChangeInput={props.onChangeInput} errors={errors} />
      <Password
        value={password}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Button onClick={props.onSubmit}>Validar</Button>
      <Button onClick={props.onReset}>Resetar</Button>
    </form>
  );
};

export default Form;
