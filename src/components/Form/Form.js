import React from 'react';
import { Button, CustomInput } from './subcomponents';

const Form = ({
  values: { firstname, lastname, age, email, password },
  errors,
  onSubmit,
  onChangeInput,
  onReset,
}) => {
  const inputPropCollection = {
    onChangeInput,
    errors,
  };

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        label="Nome:"
        name="firstname"
        type="text"
        value={firstname}
        {...inputPropCollection}
      />
      <CustomInput
        label="Sobrenome:"
        name="lastname"
        type="text"
        value={lastname}
        {...inputPropCollection}
      />
      <CustomInput
        label="Email:"
        name="email"
        type="email"
        value={email}
        {...inputPropCollection}
      />
      <CustomInput
        label="Idade:"
        name="age"
        type="number"
        value={age}
        {...inputPropCollection}
      />
      <CustomInput
        label="Senha:"
        name="password"
        type="password"
        value={password}
        {...inputPropCollection}
      />
      <Button onClick={onSubmit}>Validar</Button>
      <Button onClick={onReset}>Resetar</Button>
    </form>
  );
};

export default Form;
