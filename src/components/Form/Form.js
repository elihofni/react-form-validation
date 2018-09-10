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
  const { firstname, lastname, age, email, password, errors } = props.value;
  return (
    <form>
      <Firstname
        firstname={firstname}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Lastname
        lastname={lastname}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Email
        email={email}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Age age={age} onChangeInput={props.onChangeInput} errors={errors} />
      <Password
        password={password}
        onChangeInput={props.onChangeInput}
        errors={errors}
      />
      <Button onClick={props.onSubmit}>Validar</Button>
      <Button onClick={props.onReset}>Resetar</Button>
    </form>
  );
};

export default Form;
