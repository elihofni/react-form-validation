import { map, zip, head, forEach } from "lodash-fp";

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

  makeTests(bundle) {
    // TODO: fazer as validações aqui....
    console.log(bundle);
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

  hasErrors() {
    return this.messages.length !== 0;
  }
};

export default validator;
