// Tests
const rules = {
  isNonEmpty: {
    performTest(value) {
      return value !== '';
    },
    instructions: 'Este campo deve ser preenchido.',
  },

  isNumber: {
    performTest(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    instructions: 'Este campo deve ser um número.',
  },

  isAlphaNum: {
    performTest(value) {
      return !/[^a-z0-9]/i.test(value);
    },
    instructions: 'Este campo não pode ter símbolos especiais.',
  },

  isEmail: {
    performTest(value) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    },
    instructions: 'Este email é invalido.',
  },
};

export default rules;
