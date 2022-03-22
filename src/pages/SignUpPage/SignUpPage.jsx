import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import validation from '../../utils'
import {
  getSecurityQuestions,
  registerUser,
} from '../../redux/actions/userActions'
const SignUpPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [securityQues, setSecurityQues] = useState('What is your first pet ?')
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [validateMessage, setValidateMessage] = useState('')

  const securityQuestions = useSelector((state) => state.securityQuestions)
  const { loading: loadingSecurity, security } = securityQuestions

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success, userInfo } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: user } = userLogin

  useEffect(() => {
    if (user) {
      navigate('/signin')
    }
    if (success) setMessage('')
    dispatch(getSecurityQuestions())
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
    } else if (securityQuestionAnswer.length < 1) {
      setMessage('Security Question should be given an answer')
    } else {
      const msg = validation(name, email, password)
      if (msg === 'Validations Passed') {
        dispatch(
          registerUser(
            name,
            email,
            password,
            securityQues,
            securityQuestionAnswer
          )
        )
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setSecurityQues('')
        setSecurityQuestionAnswer('')
      } else {
        setMessage(msg)
      }
    }
  }
  return (
    <Container>
      <Row className='justify-content-md-center py-2'>
        <Col xs={12} md={6}>
          <h3 className='py-3'>Sign Up</h3>
          {loading && <Loader />}
          {loadingSecurity && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          {message && <Message variant='danger'>{message}</Message>}
          {success && (
            <Message variant='success'>
              User Registered.Please proceed to login
            </Message>
          )}
          {validateMessage && (
            <Message variant='info'>{validateMessage}</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3 text-muted' controlId='name'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 text-muted' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-muted' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 text-muted' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 text-muted' controlId='confirmPassword'>
              <Form.Label>Choose Security Question</Form.Label>

              <Form.Select
                value={securityQues}
                onChange={(e) => setSecurityQues(e.target.value)}>
                {security.map((x) =>
                  x.question.map((ques) => (
                    <option value={ques} key={ques}>
                      {ques}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className='mb-3 text-muted'
              controlId='securityQuestionAnswer'>
              <Form.Label>Security Question Answer</Form.Label>
              <Form.Control
                type='test'
                placeholder='Security Question Answer'
                value={securityQuestionAnswer}
                onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
              />
            </Form.Group>

            <Button variant='warning' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
