import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { Button, Table, Badge } from 'react-bootstrap'

import { getUserOrders } from '../../redux/actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
const UserOrdersPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const userOrders = useSelector((state) => state.userOrders)
  const {
    loading: loadingUserOrders,
    error: errorUserOrders,
    orders,
  } = userOrders
  const style = {
    textAlign: 'center',
    fontSize: '20px',
  }
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(getUserOrders())
    }
  }, [navigate, dispatch])
  return (
    <div>
      {orders.length === 0 ? (
        <Message variant='warning'>
          You havent made any order yet {userInfo.name}
        </Message>
      ) : (
        <>
          <h3>MY ORDERS</h3>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>
                    <h4>{order._id}</h4>
                  </td>

                  <td>{order.createdAt}</td>
                  <td>
                    <h4>{order.totalPrice}</h4>
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
                        <Badge bg='primary' style={style}>
                          Order Not confimred
                        </Badge>
                      )
                    ) : null}
                  </td>
                  <td>
                    {order.isReceived ? (
                      order.isDelivered ? (
                        <Badge bg='success' style={style}>
                          Order out for delivery
                        </Badge>
                      ) : (
                        <Badge bg='info' style={style}>
                          Food is getting ready
                        </Badge>
                      )
                    ) : null}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='warning' size='lg' style={style}>
                        Order Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default UserOrdersPage
