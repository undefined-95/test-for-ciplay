const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmailValid = (email) => {
  return EMAIL_REGEX.test(email)
}

export const isPasswordValid = (password) => {
  if (typeof password !== 'string') return false
  return password.length > 4 && password.length < 10
}