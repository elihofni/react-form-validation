import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from './components/Form/Form';
import validator from './components/validator/validator';
import rules from './components/validator/rules';

const validationConfig = {
  firstname: [rules.isNonEmpty],
  lastname: [rules.isNonEmpty],
  email: [rules.isNonEmpty, rules.isEmail],
  age: [rules.isNonEmpty, rules.isNumber],
  password: [rules.isNonEmpty, rules.isAlphaNum],
};

const initialState = {
  form: {
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
  },
  errors: {},
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e) {
    const { value, name } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  }

  onReset(e) {
    e.preventDefault();
    this.setState(prevState => initialState);
  }

  onSubmit(e) {
    e.preventDefault();
    validator.validate(validationConfig, this.state.form);
    if (validator.hasErrors()) {
      console.log(validator.messages);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Validação de Formulários para o GCN</h1>
        <Form
          value={this.state.form}
          onChangeInput={this.onChangeInput}
          onReset={this.onReset}
          onSubmit={this.onSubmit}
          validation={this.validation}
        />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
