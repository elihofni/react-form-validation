export default function validate(validations = {}, form = {}) {
  const errors = {};

  Object.entries(validations).forEach(([key, tests]) => {
    if (form[key] !== undefined) {
      tests.forEach(validator => {
        const isValid = validator.test(form[key]);

        if (!isValid) {
          if (errors[key]) {
            errors[key].push(validator.instructions);
          } else {
            errors[key] = [validator.instructions];
          }
        }
      });
    } else {
      throw new ReferenceError(
        `A propriedade >>${key}<< das validações não foi encontrada no form`
      );
    }
  });

  errors.hasErrors = !!Object.keys(errors).length;

  return errors;
}
