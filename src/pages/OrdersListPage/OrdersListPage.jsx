import React, { useEffect } from 'react'
import Message from '../../components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import {
  getOrderList,
  orderConfirmation,
  orderDelivery,
} from '../../redux/actions/orderActions'
import { Table, Button, Container, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const OrdersListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderConfirm = useSelector((state) => state.orderConfirm)
  const {
    order: confirmedOrder,
    success: successConfirm,
    error: errorConfirm,
  } = orderConfirm

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    order: deliveredOrder,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver

  const style = {
    textAlign: 'center',
    fontSize: '23px',
  }
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else {
      dispatch(getOrderList())
    }
    if (successConfirm || successDeliver) dispatch(getOrderList())
  }, [dispatch, userInfo, successConfirm, successDeliver])

  const handleConfirmHandler = (id) => {
    dispatch(orderConfirmation(id))
  }
  const handleDeliverHandler = (id) => {
    dispatch(orderDelivery(id))
  }
  return (
    <div>
      {' '}
      {orders.length === 0 ? (
        <Message variant='warning'>No Orders yet</Message>
      ) : (
        <Container className='justify-content-md-center py-2'>
          <h1>Orders</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL PRICE</th>
                  <th>PAID</th>
                  <th>RECEIVED</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    {console.log(order)}
                    <td>{order.user}</td>
                    <td>{order.createdAt}</td>
                    <td>
                      <a>{order.totalPrice}</a>
                    </td>
                    <td>
                      {order.isPaid ? (
                        <Badge bg='success' style={style}>
                          Paid
                        </Badge>
                      ) : (
                        <Badge bg='danger' style={style}>
                          Not Paid
                        </Badge>
                      )}
                    </td>
                    <td>
                      {order.isPaid ? (
                        order.isReceived ? (
                          <Badge bg='success' style={style}>
                            Order Confirmed
                          </Badge>
                        ) : (
                          <Button
                            variant='info'
                            size='lg'
                            onClick={() => handleConfirmHandler(order._id)}>
                            Confirm Order
                          </Button>
                        )
                      ) : null}
                    </td>
                    <td>
                      {order.isReceived ? (
                        order.isDelivered ? (
                          <Badge bg='success' style={style}>
                            Out for delivery
                          </Badge>
                        ) : (
                          <Button
                            variant='warning'
                            size='lg'
                            onClick={() => handleDeliverHandler(order._id)}>
                            Deliver Order
                          </Button>
                        )
                      ) : null}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='warning' size='lg'>
                          Order Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      )}
    </div>
  )
}

export default OrdersListPage
