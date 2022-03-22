import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Button from '@mui/material/Button'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { listPizzas } from '../../redux/actions/pizzaActions'

export const VegPizzaspage = () => {
  const dispatch = useDispatch()

  const pizzaList = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaList
  const menu = pizzas.filter((item) => item.category === 'VEG')
  useEffect(() => {
    dispatch(listPizzas())
  }, [dispatch])
  return (
    <>
      <Container expand='lg' className='py-3'>
        <Row>
          <Col className='text-center'>
            <h3>VEG PIZZAS</h3>
          </Col>
        </Row>

        {loading ? (
          <Row>
            <Col className='text-center'>
              <Loader />
            </Col>{' '}
          </Row>
        ) : error ? (
          <Row>
            <Col className='text-center'>
              <Message variant='danger'>{error}</Message>
            </Col>
          </Row>
        ) : (
          <Row className='p-2'>
            {menu.map((item) => (
              <Col
                key={item._id}
                sm={12}
                md={6}
                lg={4}
                className='p-5 d-flex justify-content-center text-center'>
                <Card style={{ width: '16rem' }}>
                  <Card.Img variant='top' src={item.image} />
                  <Card.Body className='py-3'>
                    <Card.Title>
                      <h3>{item.name}</h3>
                    </Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>
                      <h4>Rs.{item.price}</h4>
                    </Card.Text>
                  </Card.Body>
                  <LinkContainer to={`/pizzas/customise/${item._id}`}>
                    <Button variant='contained' color='info'>
                      Customise
                    </Button>
                  </LinkContainer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}
