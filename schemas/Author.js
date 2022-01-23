const validate = (firstName, middleName, lastName) => {
  if (!firstName) return { code: 422, message: 'First name required' };
  if (typeof firstName !== 'string') return { code: 422, message: 'First name must be string' };
  if (!lastName) return { code: 422, message: 'Last name required' };
  if (typeof lastName !== 'string') return { code: 422, message: 'Last name must be string'}
  if (middleName && typeof middleName !== 'string') return { code: 422, message: 'Middle name must be string' };
  return {};
};

module.exports = {
  validate,
};
