const errors = {
  firstName_blank: 'First name required',
  fistName_not_string: 'First name must be string',
  lastName_blank: 'Last name required',
  lastName_not_string: 'Last name must be string',
  middleName_not_string: 'Middle name must be string',
};

const blank = value => !value;
const notString = value => typeof value !== 'string';

const validate = (firstName, middleName, lastName) => {
  switch (true) {
    case blank(firstName): return { code: 422, message: errors.firstName_blank };
    case notString(firstName): return { code: 422, message: errors.fistName_not_string  };
    case blank(lastName): return { code: 422, message: errors.lastName_blank };
    case notString(lastName): return { code: 422, message: errors.lastName_not_string }
    case middleName && notString(middleName): return { code: 422, message: errors.middleName_not_string };
    default : return {};
  };
};

module.exports = {
  validate,
};
