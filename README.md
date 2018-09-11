# Validação de Formulários

### Motivação

Boa parte da complexidade de uma aplicação em React envolve a implementação das regras de validação de formulários. Como o objetivo de facilitar a lógica envolvida nesta implementação, apresento aqui uma nova forma de realizá-la.

### Padrão de Design

O padrão de design utilizado para a implementação dessa funcionalidade é chamado de `strategy`. Veja referência [aqui](http://sd.blackball.lv/library/JavaScript_Patterns_%282010%29.pdf), página 155.

### API

Eis como faremos as nossas validações. Invocaremos uma função chamada `validate` com dois argumentos: um objeto de configuração (`configObject`) e os dados que gostaríamos de validar (`state`). O resultado da função é um objeto de validação com as mensagens e a quantidade de erros (`validationObject`).

```js
validate(config: configObject, form: state): validationObject
```

### Exemplo

Temos um formulário com os seguintes campos:

- nome
- sobrenome
- email
- idade
- senha

Com o seu estado representado da seguinte forma:

```jsx
this.state = {
  form: {
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
  },
};
```

Para validar este formulário, a primeira coisa a ser feita é estabeler quais serão as regras de validação para cada um dos campos. Com isso em mente, criaremos um `configObject` no qual cada uma das chaves de validação deve conter um array com nenhuma, uma ou mais regras:

```jsx
import rules from './components/validator/rules';

const configObject = {
  firstname: [rules.isNonEmpty],
  lastname: [rules.isNonEmpty],
  email: [rules.isNonEmpty, rules.isEmail],
  age: [rules.isNonEmpty, rules.isNumber],
  password: [rules.isNonEmpty, rules.isPassword],
};
```

Em seguida, basta invocarmos a função `validate` como o objeto de configuração e o formulário a ser validado:

```js
import validate from './components/validator/validate';

const validationObject = validate(configObject, this.state.form);
```

O resultado dessa função, caso todos os testes sejam inválidos, é um `validationObject` que possui a seguinte estrutura:

```js
{
  errors: {
    age: [
      'Este campo deve ser preenchido.',
      'Este campo deve ser um número.'
    ],
    email: [
      'Este campo deve ser preenchido.',
      'Este email é invalido.'
    ],
    firstname: [
      'Este campo deve ser preenchido.'
    ],
    lastname: [
      'Este campo deve ser preenchido.'
    ],
    password: [
      'Este campo deve ser preenchido.',
      'Deve conter 8 caracteres no mínimo, sendo pelo menos um maiúsculo, um minúsculo e um número.'
    ]
  },
  hasErrors: true,
  length: 8
}
```

Para finalizar, basta representar os resultados no estado ou enviá-los para uma ação do redux:

```jsx
onSubmit(e) {
### Testes
  e.preventDefault();
  const validation = validate(validateConfig, this.state.form);

  // State do React
  this.setState(prevState => ({
    ...prevState,
    errors: validation.errors,
  }));

  // ou diparar uma ação do redux
  this.props.actions.setValitation(validation);
}
```

### Estabelecendo as Regras

O conjuto de regras deve ser um objeto em que cada regra é representada por uma propriedade. Por sua vez, cada regra deve ser um objeto com um método chamado `performTest` e uma propriedade chamada `instructions`:

```js
const rules = {
  isNonEmpty: {
    performTest(value) {
      return value !== '';
    },
    instructions: 'Este campo deve ser preenchido.',
  },
  // ... mais regras
};
```

Diversas regras podem ser criadas de acordo com a necessidade. O importante é que cada uma delas deve testar apenas uma coisa. Para aplicar múltiplas regras de validação para um determinado campo, basta concatená-las dentro de uma array dentro do `configObject`. Ex: `password: [rules.isNonEmpty, rules.isPassword, ...]`
