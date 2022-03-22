const validation = (name, email, password) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
  const namePattern = /^[a-zA-Z ]{2,16}$/
  const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

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
      return 'Passowrd should contain minimum 6 letters and a maximum of 16 letters'
    }
  }
  return 'Validations Passed'
}

export default validation
