import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Image,
  Button,
} from 'react-bootstrap'
import Message from '../../components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../redux/actions/orderActions'

const PlaceOrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { cartItems, paymentMethod, deliveryAddress } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const addDecimal = (num) => {
    return ((num * 100) / 100).toFixed(2)
  }
  const itemsPrice = cartItems.reduce((acc, i) => acc + Number(i.totalPrice), 0)

  const deliveryCharges = addDecimal(0.1 * itemsPrice)

  const taxPrice = 0.08 * itemsPrice

  const totalPrice = addDecimal(
    Number(itemsPrice) + Number(deliveryCharges) + Number(taxPrice)
  )

  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, error, order } = orderCreate

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [success, navigate])
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        paymentMethod,
        deliveryAddress,
        taxPrice,
        deliveryCharges,
        totalPrice,
      })
    )
  }
  return (
    <Container>
      <h1>Confirm your order</h1>
      <Row className='my-5'>
        <Col md={6}>
          <h4>Order Details</h4>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col md={2}></Col>
                <Col md={2}>Pizza</Col>
                <Col md={2}>Qty</Col>
                <Col md={2}>Pizza Price</Col>
                <Col md={2}>Extra Charges</Col>
                <Col md={2}>Total Price</Col>
              </Row>
            </ListGroupItem>
            {cartItems.map((item) => (
              <ListGroupItem>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.pizzaBase}
                      rounded
                      fluid></Image>
                  </Col>
                  <Col md={2}>{item.pizzaBase}</Col>
                  <Col md={2}>{item.qty}</Col>
                  <Col md={2}>{item.pizzaPrice}</Col>
                  <Col md={2}>
                    {item.veggiePrice} + {item.meatPrice}
                  </Col>
                  <Col md={2}>{item.totalPrice}</Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <h4>Order Summary</h4>
          <ListGroup>
            <ListGroupItem>
              <Col>Items Price : </Col>
              <Col>Rs.{itemsPrice}</Col>
            </ListGroupItem>
            <ListGroupItem>
              <Col>Tax Price : </Col>
              <Col>Rs.{taxPrice}</Col>
            </ListGroupItem>
            <ListGroupItem>
              <Col>Delivery Charges : </Col>
              <Col>Rs.{deliveryCharges}</Col>
            </ListGroupItem>
            <ListGroupItem>
              <Col>Total : </Col>
              <Col>Rs.{totalPrice}</Col>
            </ListGroupItem>
            <ListGroupItem>
              {error && <Message variant='danger'>{error}</Message>}
            </ListGroupItem>
            <ListGroupItem>
              <Button variant='success' onClick={() => placeOrderHandler()}>
                Place Order
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderPage
