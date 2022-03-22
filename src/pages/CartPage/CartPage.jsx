import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  Image,
  Button,
} from 'react-bootstrap'
import Message from '../../components/Message/Message'
import { removeFromCart } from '../../redux/actions/cartActions'
const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkOutHandler = () => {
    navigate('/deliveryaddress')
  }

  return (
    <>
      <Row>
        <h1> CART ITEMS</h1>
        {cartItems.length === 0 ? (
          <Message variant='secondary'>Your Cart is empty.</Message>
        ) : (
          <Row>
            <Col md={6}>
              <ListGroup variant='flush' className='py-4'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='d-flex justify-content-center text-center'>
                      <Col md={2} className='p-2'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          rounded
                          fluid
                          style={{ width: '14rem' }}
                        />
                      </Col>
                      <Col lg={4}>
                        <h4>{item.name}</h4>
                      </Col>
                      <Col ListGroupItem={2}>
                        <h4>Qty : {item.qty}</h4>
                      </Col>
                      <Col lg={2}>
                        <h4>Rs. {item.totalPrice}</h4>
                      </Col>
                      <Col lg={1}>
                        <IconButton
                          aria-label='delete'
                          color='warning'
                          onClick={() => removeFromCartHandler(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={4} className='p-5'>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <h3>
                      Subtotal (
                      {cartItems.reduce((acc, i) => acc + Number(i.qty), 0)})
                      items
                    </h3>
                    <h4>
                      Total Cost :{' '}
                      {cartItems.reduce(
                        (acc, i) => acc + Number(i.totalPrice),
                        0
                      )}
                    </h4>
                    <Button variant='danger' onClick={() => checkOutHandler()}>
                      Proceed to Checkout
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Row>
    </>
  )
}

export default CartPage
