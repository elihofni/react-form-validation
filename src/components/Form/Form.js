import React from 'react';
import { Button, CustomInput } from './subcomponents';

const Form = props => {
  const {
    values: { firstname, lastname, age, email, password },
    errors,
  } = props;
  return (
    <form>
      <CustomInput
        errors={errors}
        label="Nome:"
        name="firstname"
        onChangeInput={props.onChangeInput}
        type="text"
        value={firstname}
      />
      <CustomInput
        errors={errors}
        label="Sobrenome:"
        name="lastname"
        onChangeInput={props.onChangeInput}
        type="text"
        value={lastname}
      />
      <CustomInput
        errors={errors}
        label="Email:"
        name="email"
        onChangeInput={props.onChangeInput}
        type="email"
        value={email}
      />
      <CustomInput
        errors={errors}
        label="Idade:"
        name="age"
        onChangeInput={props.onChangeInput}
        type="number"
        value={age}
      />
      <CustomInput
        errors={errors}
        label="Senha:"
        name="password"
        onChangeInput={props.onChangeInput}
        type="password"
        value={password}
      />
      <Button onClick={props.onSubmit}>Validar</Button>
      <Button onClick={props.onReset}>Resetar</Button>
    </form>
  );
};

export default Form;
