import { zip, head, forEach, last } from 'lodash-fp';

const validate = (config, form) => {
  let bundle = [],
    errors = {},
    messages = [];

  const init = (config, form) => {
    makeBundle(config, form);
    verifyKeys(bundle);
    performTests(bundle);
    buildErrorsObject(messages);
    return {
      errors,
      hasErrors: hasErrors(),
      length: messages.length,
    };
  };

  const makeBundle = (config, form) => {
    const tests = Object.entries(config).sort((a, b) => head(a) > head(b));
    const data = Object.entries(form).sort((a, b) => head(a) > head(b));
    bundle = zip(data, tests);
  };

  const verifyKeys = bundle => {
    forEach(([tests, data]) => {
      const testKey = head(tests);
      const dataKey = head(data);
      const areEqual = testKey === dataKey;
      if (!areEqual) {
        throw new Error(
          `A propriedade do formulário >>${dataKey}<< e a propriedade do teste >>${testKey}<< não são as mesmas.`
        );
      }
    })(bundle);
  };

  const performTests = bundle => {
    forEach(([tests, data]) => {
      const validators = last(tests);
      const [key, value] = data;
      const trimmedValue = value.trim();

      forEach(validator => {
        const pass = validator.performTest(trimmedValue);
        if (!pass) {
          messages.push({
            [key]: validator.instructions,
          });
        }
      })(validators);
    })(bundle);
  };

  const buildErrorsObject = messages => {
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

  const hasErrors = () => messages.length !== 0;

  return init(config, form);
};

export default validate;
