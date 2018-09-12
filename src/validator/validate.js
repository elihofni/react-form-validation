import { zip, forEach, flow } from 'lodash-fp';

const validate = (config, form) => {
  // Zip together config and form data.
  const makeBundle = (config, form) => {
    const compareStrings = ([a], [b]) => a.localeCompare(b);
    const tests = Object.entries(config).sort(compareStrings);
    const data = Object.entries(form).sort(compareStrings);
    const bundle = zip(data, tests);

    return bundle;
  };
  // Verify if the keys of the config object and the form are the same.
  const verifyKeys = bundle => {
    forEach(([[testKey], [dataKey]]) => {
      const areEqual = testKey === dataKey;
      if (!areEqual) {
        throw new Error(
          `A propriedade do formulário >>${dataKey}<< e a propriedade do teste >>${testKey}<< não são as mesmas.`
        );
      }
    })(bundle);

    return bundle;
  };
  // Perform the tests for each field of the form and return a array of error messages.
  const performTests = bundle => {
    const messages = [];

    forEach(([[_, validators], [dataKey, dataValue]]) => {
      const trimmedValue = dataValue.trim();

      forEach(validator => {
        const pass = validator.performTest(trimmedValue);
        if (!pass) {
          messages.push({
            [dataKey]: validator.instructions,
          });
        }
      })(validators);
    })(bundle);

    return messages;
  };
  // Put together an errorObject
  const buildErrorsObject = messages => {
    const errors = messages.reduce((tally, obj) => {
      const [[key, message]] = Object.entries(obj);
      if (!tally[key]) {
        tally[key] = [message];
      } else {
        tally[key] = [...tally[key], message];
      }
      return tally;
    }, {});

    return {
      errors,
      hasErrors: messages.length !== 0,
      length: messages.length,
    };
  };
  // Chain functions above, giving the output of the previous function as input to the next.
  return flow(
    makeBundle,
    verifyKeys,
    performTests,
    buildErrorsObject
  )(config, form);
};

export default validate;
