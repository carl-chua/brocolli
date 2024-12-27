const {
  validateName,
  validateEmail,
  validateConfirmEmail,
} = require('../../lib/validate');

test('validates a correct name', () => {
  expect(validateName('John Doe')).toBe(null);
});

test('invalidates a name with numbers', () => {
  expect(validateName('John123')).toBe(null);
});

test('invalidates a name with special characters', () => {
  expect(validateName('John@Doe')).toBe(null);
});

test('invalidates an empty name', () => {
  expect(validateName('')).toBe('Name must be at least 3 characters long');
});

test('validates a correct email', () => {
  expect(validateEmail('test@example.com')).toBe(null);
});

test('invalidates an incorrect email', () => {
  expect(validateEmail('test@.com')).toBe('Email is not valid');
});

test('invalidates an email without @ symbol', () => {
  expect(validateEmail('testexample.com')).toBe('Email is not valid');
});

test('invalidates an email without domain', () => {
  expect(validateEmail('test@')).toBe('Email is not valid');
});

test('invalidates an email with space', () => {
  expect(validateEmail('test @example.com')).toBe('Email is not valid');
});

test('validates matching emails', () => {
  expect(validateConfirmEmail('test@example.com', 'test@example.com')).toBe(
    null
  );
});

test('invalidates non-matching emails', () => {
  expect(validateConfirmEmail('test@example.com', 'test2@example.com')).toBe(
    'Emails do not match'
  );
});

test('invalidates empty confirm email', () => {
  expect(validateConfirmEmail('test@example.com', '')).toBe(
    'Emails do not match'
  );
});
