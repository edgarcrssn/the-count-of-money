type RegexObject = {
  regex: RegExp
  message: string
}

/**
 * Must only contain letters and/or spaces
 */
export const onlyLettersAndOrSpacesRegexObject: RegexObject = {
  regex: /^[A-Za-z\s]+$/,
  message: 'must only contain letters and/or spaces',
}

/**
 * Must only contain lowercase letters and/or numbers that can be separated by hyphen (slug friendly)
 */
export const slugRegexObject: RegexObject = {
  regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  message: 'must only contain lowercase letters and/or numbers that can be separated by hyphen',
}

/**
 * Must contain at least one uppercase letter, one lowercase letter, and one digit
 */
export const passwordRegexObject: RegexObject = {
  regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
  message: 'must contain at least one uppercase letter, one lowercase letter, and one digit',
}
