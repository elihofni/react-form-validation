import { map, zip, head, forEach, last } from 'lodash-fp';

const validate = (config, form) => {
  let bundle = [],
    data = [],
    errors = {},
    messages = [],
    tests = [];

  const init = (config, form) => {
    reset();
    setData(config, form);
    verifyKeys(bundle);
    makeTests(bundle);
    makeErrorsObject(messages);
    return {
      errors,
      hasErrors: hasErrors(),
    };
  };

  const reset = () => {
    bundle = [];
    data = [];
    errors = {};
    messages = [];
    tests = [];
  };

  const setData = (config, form) => {
    tests = Object.entries(config).sort((a, b) => head(a) > head(b));
    data = Object.entries(form).sort((a, b) => head(a) > head(b));
    bundle = zip(data, tests);
  };

  const verifyKeys = bundle => {
    const results = map(([tests, data]) => {
      const testKey = head(tests);
      const dataKey = head(data);
      return [testKey, dataKey, testKey === dataKey];
    })(bundle);

    forEach(result => {
      const [testKey, dataKey, areEqual] = result;
      if (!areEqual) {
        throw new Error(
          `A propriedade do formulário >>${dataKey}<< e a propriedade do teste >>${testKey}<< não são as mesmas.`
        );
      }
    })(results);
  };

  const makeTests = bundle => {
    forEach(([tests, data]) => {
      const validators = last(tests);
      const [key, value] = data;

      forEach(validator => {
        const pass = validator.performTest(value);
        if (!pass) {
          messages.push({
            [key]: validator.instructions,
          });
        }
      })(validators);
    })(bundle);
  };

  const makeErrorsObject = messages => {
    errors = messages.reduce((tally, obj) => {
      const [[key, message]] = Object.entries(obj);
      if (!tally[key]) {
        tally[key] = [message];
      } else {
        tally[key] = [...tally[key], message];
      }
      return tally;
    }, {});
  };

  const hasErrors = () => {
    return messages.length !== 0;
  };

  return init(config, form);
};

export default validate;
