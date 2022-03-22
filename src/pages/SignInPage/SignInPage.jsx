import React, { useState, useEffect } from 'react'
import { userConstants } from '../../redux/constants/userConstants'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Container, Row, Button, Col } from 'react-bootstrap'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { loginUser } from '../../redux/actions/userActions'
import validation from '../../utils'

const SignInPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  if (error) {
    setMessage(error)
    userLogin.error = ''
  }
  useEffect(() => {
    if (userInfo) navigate('/')
    dispatch({
      type: userConstants.USER_BY_EMAIL_RESET,
    })
    dispatch({
      type: userConstants.USER_SECURITY_CONFIRMATION_RESET,
    })

    dispatch({
      type: userConstants.USER_PASSWORD_RESET_RESET,
    })
  })
  const submitHandler = (e) => {
    e.preventDefault()
    const msg = validation('', email, '')

    if (msg === 'Validations Passed') {
      e.preventDefault()
      dispatch(loginUser(email, password))
      setEmail('')
      setPassword('')
    } else {
      setMessage(msg)
    }
  }
  return (
    <Container>
      <Row className='justify-content-md-center py-2'>
        <Col xs={12} md={6}>
          <h3 className='mb-6 py-3'>Sign In</h3>
          {loading && <Loader />}
          {message && <Message variant='danger'>{message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='forgotPassword'>
              <Link to='/forgotpassword'>Forgot Password ?</Link>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              If you have recently registered, please confirm your email and try
              sign in.
            </Col>
          </Row>
          <Row className='py-3'>
            <Col>
              New Customer ? <Link to='/signup'>Sign Up</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SignInPage
