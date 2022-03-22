const validation = (name, email, password) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
  const namePattern = /^[a-zA-Z ]{2,16}$/
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  if (name) {
    if (!namePattern.test(name)) {
      return 'Please enter a valid username. Username should have only letters and a minimum of 2 and maximum of 16 letters are allowed'
    }
  }
  if (email) {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email id'
    }
  }
  if (password) {
    if (!passwordPattern.test(password)) {
      return 'Passowrd should contain Minimum eight characters, at least one letter, one number and one special character'
    }
  }
  return 'Validations Passed'
}

export default validation
