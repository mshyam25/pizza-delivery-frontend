import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import './styles.css'
import API from '../../api'
import {
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Badge,
  Button,
} from 'react-bootstrap'
import Message from '../../components/Message/Message'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getOrderDetails, payOrder } from '../../redux/actions/orderActions'
import Loader from '../../components/Loader/Loader'
import { useState } from 'react'
import { orderConstants } from '../../redux/constants/orderConstants'

const PaymentPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const style = {
    textAlign: 'center',
    fontSize: '22px',
  }
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${API}/paypalclient`)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`

      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || order._id !== params.id || successPay) {
      dispatch({ type: orderConstants.ORDER_PAY_RESET })
      dispatch(getOrderDetails(params.id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }
    } else {
      setSdkReady(true)
    }
  }, [dispatch, order, params.id, successPay])

  const paymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(params.id, paymentResult))
  }

  return (
    <Container className='my-5 payment-page'>
      <Row>
        {!userInfo.isAdmin && (
          <>
            <h3>Use below fake payment details</h3>
            <h5>sb-zkzqv14256732@personal.example.com</h5>
            <h5>sjT0J^:B</h5>
          </>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h2>Order {order._id}</h2>
            <Col md={12} className='my-4 text-center'>
              <ListGroup>
                <ListGroupItem>
                  <h4>Username : {order.user.name}</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <h4>
                    {' '}
                    Delivery Address : {order.deliveryAddress.address},
                    {order.deliveryAddress.city},
                    {order.deliveryAddress.postalCode}
                  </h4>
                </ListGroupItem>
                <ListGroupItem>
                  {order.orderItems.map((item) => (
                    <ListGroupItem>
                      <h3>
                        {' '}
                        {item.name} - Qty : {item.qty}
                      </h3>
                    </ListGroupItem>
                  ))}
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Payment : {order.paymentMethod}</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Total Amount : {order.totalPrice}</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>
                    {' '}
                    Payment Status :{' '}
                    {order.isPaid ? (
                      <Badge bg='success' style={style}>
                        Paid
                      </Badge>
                    ) : (
                      <Badge bg='danger' style={style}>
                        Not Paid
                      </Badge>
                    )}
                  </h5>
                </ListGroupItem>
                <ListGroupItem>
                  {userInfo && !userInfo.isAdmin && order.isPaid ? (
                    !order.isReceived ? (
                      <Badge bg='info' style={style}>
                        Waiting for order to be confirmed
                      </Badge>
                    ) : (
                      order.isReceived &&
                      !order.isDelivered && (
                        <Badge bg='success' style={style} className='m-3'>
                          Order confirmed
                        </Badge>
                      )
                    )
                  ) : (
                    ''
                  )}
                  {userInfo &&
                  !userInfo.isAdmin &&
                  order.isPaid &&
                  order.isReceived ? (
                    !order.isDelivered ? (
                      <Badge bg='info' style={style}>
                        Your food is getting ready
                      </Badge>
                    ) : (
                      <Badge bg='success' style={style}>
                        Order out for delivery
                      </Badge>
                    )
                  ) : (
                    ''
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isReceived && (
                      <Badge bg='info' style={style}>
                        Order fully paid. Yet to be confirmed.
                      </Badge>
                    )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    order.isReceived &&
                    !order.isDelivered && (
                      <Badge bg='warning' style={style}>
                        Order confirmed. Yet to be Delivered.
                      </Badge>
                    )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    order.isReceived &&
                    order.isDelivered && (
                      <Badge bg='success' style={style}>
                        Order out for delivery
                      </Badge>
                    )}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={6} className='my-4'>
              {!order.isPaid && userInfo && !userInfo.isAdmin && (
                <ListGroup>
                  <ListGroupItem>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={paymentHandler}></PayPalButton>
                    )}
                  </ListGroupItem>
                </ListGroup>
              )}
            </Col>
          </>
        )}
      </Row>
    </Container>
  )
}

export default PaymentPage
