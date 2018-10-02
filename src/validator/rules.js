// Tests
const rules = {
  isNonEmpty: {
    test: value => value !== '',
    instructions: 'Este campo deve ser preenchido.',
  },

  isNumber: {
    test: value => !isNaN(parseFloat(value)) && isFinite(value),
    instructions: 'Este campo deve ser um número.',
  },

  isPassword: {
    test: value =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(value),
    instructions:
      'Deve conter 8 caracteres no mínimo, sendo pelo menos um maiúsculo, um minúsculo e um número.',
  },

  isEmail: {
    test(value) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    },
    instructions: 'Este email é invalido.',
  },
};

export default rules;
