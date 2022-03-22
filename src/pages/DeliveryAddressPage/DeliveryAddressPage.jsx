import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { addDeliveryAddress, addPayment } from '../../redux/actions/cartActions'
import { orderReset } from '../../redux/actions/orderActions'
const DeliveryAddressPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [payment, setPayment] = useState('Paypal')
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const cart = useSelector((state) => state.cart)
  const { deliveryAddress, paymentMethod } = cart

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (deliveryAddress.address) {
      setAddress(deliveryAddress.address)
      setPostalCode(deliveryAddress.postalCode)
      setCity(deliveryAddress.city)
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addDeliveryAddress({ address, postalCode, city }))
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    dispatch(addPayment(payment))
    dispatch(orderReset())
    navigate('/ordersummary')
  }
  return (
    <Container>
      <Row className='justify-content-md-center py-6'>
        <Col xs={12} md={6}>
          <h3>Delivery Address</h3>

          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3 text-muted' controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3 text-muted' controlId='postalcode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter PostalCode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3 text-muted' controlId='city'>
              <Form.Label>city</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Button variant='danger' type='submit'>
              Confirm Delivery Address
            </Button>
          </Form>
        </Col>
        <Col md={2}></Col>
        <Col md={4} className='my-5'>
          <h3>Select Payment Method</h3>
          <Form className='my-5' onSubmit={handlePaymentSubmit}>
            <Form.Group>
              <Form.Check
                inline
                label='Razor Checkout'
                value='Razor'
                name='paymentMethod'
                type='radio'
                onChange={(e) => setPayment(e.target.value)}
              />

              <Form.Check
                inline
                label='Paypal or Credit Card'
                value='Paypal'
                name='paymentMethod'
                type='radio'
                checked
                onChange={(e) => setPayment(e.target.value)}
              />
            </Form.Group>
            <Button variant='info' type='submit'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default DeliveryAddressPage
