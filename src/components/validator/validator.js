import { map, zip, head, forEach, last } from 'lodash-fp';

const validator = {
  bundle: [],
  data: [],
  errors: {},
  messages: [],
  tests: [],
  keys: [],

  validate(tests, data) {
    this.reset();
    this.setData(tests, data);
    this.verifyKeys(this.bundle);
    this.makeTests(this.bundle);
    this.makeErrorsObject(this.messages);
    return {
      errors: this.errors,
      hasErrors: this.hasErrors(),
    };
  },

  reset() {
    this.bundle = [];
    this.data = {};
    this.errors = {};
    this.keys = [];
    this.messages = [];
    this.tests = [];
  },

  setData(tests, data) {
    this.data = Object.entries(data);
    this.tests = Object.entries(tests);
    this.bundle = zip(this.data, this.tests);
  },

  verifyKeys(bundle) {
    const results = map(([tests, data]) => {
      const testKey = head(tests);
      const dataKey = head(data);
      return [testKey, dataKey, testKey === dataKey];
    })(bundle);

    this.keys = results;

    forEach(result => {
      const [testKey, dataKey, areEqual] = result;
      if (!areEqual) {
        throw new Error(
          `A propriedade do formulário >>${dataKey}<< e a propriedade do teste >>${testKey}<< não são as mesmas.`
        );
      }
    })(results);
  },

  makeTests(bundle) {
    forEach(([tests, data]) => {
      const validators = last(tests);
      const [key, value] = data;

      forEach(validator => {
        const pass = validator.performTest(value);
        if (!pass) {
          this.messages.push({
            [key]: validator.instructions,
          });
        }
      })(validators);
    })(bundle);
  },

  makeErrorsObject(messages) {
    this.errors = messages.reduce((tally, obj) => {
      const [[key, message]] = Object.entries(obj);
      if (!tally[key]) {
        tally[key] = [message];
      } else {
        tally[key] = [...tally[key], message];
      }
      return tally;
    }, {});
  },

  hasErrors() {
    return this.messages.length !== 0;
  },
};

export default validator;
