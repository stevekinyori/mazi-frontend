export const requiredValidation = (): any[] => [
  {
    required: true,
    message: 'Please provide input',
    validateTrigger: 'blur',
  },
];

export const conditionalRequiredValidation = (value: boolean): any[] => [
  {
    required: value,
    message: 'Please provide input',
    validateTrigger: 'blur',
  },
];

export const requiredStringValidation = (): any[] => [
  {
    type: 'string',
    required: true,
    message: 'Please provide input',
    validateTrigger: 'blur',
    whitespace: false,
  },
];

export const conditionalRequiredStringValidation = (value: boolean): any[] => [
  {
    type: 'string',
    required: value,
    message: 'Please provide input',
    validateTrigger: 'blur',
    whitespace: false,
  },
];

export const emailValidation = (): any[] => [
  {
    type: 'email',
    message: 'Must be a valid email',
    validateTrigger: 'blur',
    whitespace: false,
  },
];

export const minValidation = (min: number): any[] => [
  {
    type: 'string',
    min,
    message: `Input must be at least ${min} characters long`,
    validateTrigger: 'blur',
    whitespace: false,
  },
];

export const passwordValidation = (): any[] => [
  {
    type: 'string',
    required: true,
    message: 'Password must be at least 6 characters',
    validateTrigger: 'blur',
    min: 6,
  },
  {
    type: 'string',
    required: true,
    message: 'Password must contain at least one lowercase letter',
    validateTrigger: 'blur',
    pattern: /[a-z]+/,
  },
  // {
  //   type: 'string',
  //   required: true,
  //   message: 'Password must contain at least one number',
  //   validateTrigger: 'blur',
  //   pattern: /\d+/,
  // },
];
