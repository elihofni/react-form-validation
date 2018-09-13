import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ReactJson from 'react-json-view';
import Form from './components/Form/Form';
import validate from './validator/validate';
import rules from './validator/rules';

const validateConfig = {
  firstname: [rules.isNonEmpty],
  lastname: [rules.isNonEmpty],
  email: [rules.isNonEmpty, rules.isEmail],
  age: [rules.isNonEmpty, rules.isNumber],
  password: [rules.isNonEmpty, rules.isPassword],
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
  validation: {},
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
    this.setState(() => initialState);
  }

  onSubmit(e) {
    e.preventDefault();
    const validation = validate(validateConfig, this.state.form);
    this.setState(prevState => ({
      ...prevState,
      errors: validation.errors,
      validation,
    }));
  }

  render() {
    return (
      <Fragment>
        <h1>Validação de Formulários para o GCN</h1>
        <Form
          values={this.state.form}
          onChangeInput={this.onChangeInput}
          onReset={this.onReset}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        />
        <h3>Objeto de Validação</h3>
        <ReactJson
          src={this.state.validation}
          name={false}
          style={{ marginTop: '20px', padding: '20px' }}
          indentWidth={2}
          theme="monokai"
        />
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
