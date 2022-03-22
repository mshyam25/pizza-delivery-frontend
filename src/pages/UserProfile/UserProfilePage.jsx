import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../../redux/actions/userActions'
import { getUserOrders } from '../../redux/actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import validation from '../../utils'

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const userOrders = useSelector((state) => state.userOrders)
  const {
    loading: loadingUserOrders,
    error: errorUserOrders,
    orders,
  } = userOrders

  const userDetails = useSelector((state) => state.userDetails)
  const {
    loading: loadingUserProfile,
    error: errorUserProfile,
    user,
  } = userDetails
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUserUpdate,
    error: errorUserUpdate,
    success,
  } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      if (!user.name) {
        dispatch(getUserDetails())
      } else {
        dispatch(getUserOrders())
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, dispatch, userInfo, user])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
    } else {
      const msg = validation(name, email, password)
      if (msg === 'Validations Passed') {
        dispatch(updateUser({ name, email, password }))
        dispatch(getUserDetails())
      } else {
        setMessage(msg)
      }
    }
  }
  return (
    <Container>
      <Row className='justify-content-md-center py-4'>
        <Col xs={12} md={6}>
          <h3>USER PROFILE</h3>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>UserProfile Updated</Message>}
          {message && <Message variant='danger'>{message}</Message>}
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

            <Button
              variant='warning'
              type='submit'
              className='justify-content-center text-center'>
              UPDATE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
