import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Button, Col, ListGroup } from 'react-bootstrap'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import validation from '../../utils'
import {
  confirmUser,
  findUserByEmail,
  updatePassword,
} from '../../redux/actions/userActions'

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userFind = useSelector((state) => state.userFind)
  const { loading, error, success, user } = userFind

  const secuirtyConfirm = useSelector((state) => state.secuirtyConfirm)
  const {
    loading: loadingSUccess,
    error: errorSuccess,
    success: userSuccess,
  } = secuirtyConfirm

  const passwordReset = useSelector((state) => state.passwordReset)
  const { success: updateSuccess } = passwordReset

  const submitEmailHandler = (e) => {
    e.preventDefault()
    dispatch(findUserByEmail(email))
  }

  const submitSecurityHandler = (e) => {
    e.preventDefault()
    dispatch(confirmUser(user.email, securityAnswer))
  }

  const submitPassword = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
    } else {
      const msg = validation('', '', password)
      if (msg === 'Validations Passed') {
        dispatch(updatePassword(email, password))
      } else {
        setMessage(msg)
      }
    }
  }
  return (
    <Container>
      <Row className='justify-content-md-center py-5'>
        <Col xs={12} md={6}>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          {errorSuccess && <Message variant='danger'>{errorSuccess}</Message>}
          {message && <Message variant='danger'>{message}</Message>}
          {!success && (
            <>
              <h3 className='mb-6 py-3'>Enter the email id</h3>
              <Form onSubmit={submitEmailHandler}>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </>
          )}
          {success && !userSuccess && (
            <>
              <Message variant='success'>User Found</Message>
              <Form onSubmit={submitSecurityHandler}>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='text-center'>
                    <p>{user.securityQuestion}</p>
                  </ListGroup.Item>
                  <Form.Group className='mb-3' controlId='securityQuestion'>
                    <Form.Control
                      type='text'
                      placeholder='Enter Security Question Answer'
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </>
          )}
          {success && userSuccess && !updateSuccess && (
            <>
              <Form onSubmit={submitPassword}>
                <Form.Group className='mb-3 text-muted' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className='mb-3 text-muted'
                  controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant='warning' type='submit'>
                  CHANGE PASSWORD
                </Button>
              </Form>
            </>
          )}
          {updateSuccess && (
            <>
              <Message variant='success'>{updateSuccess}</Message>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPasswordPage
