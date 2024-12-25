export const validateName = (name: string): string | null => {
  if (name.trim().length < 3) {
    return 'Name must be at least 3 characters long';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  /*
   * Starts with one or more characters that are not whitespace or @.
   * Contains exactly one @ symbol.
   * Has one or more characters that are not whitespace or @ after the @ symbol.
   * Contains exactly one . symbol after the domain part.
   * Ends with one or more characters that are not whitespace or @ after the . symbol.
   **/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Email is not valid';
  }
  return null;
};

export const validateConfirmEmail = (
  email: string,
  confirmEmail: string
): string | null => {
  if (email !== confirmEmail) {
    return 'Emails do not match';
  }
  return null;
};
