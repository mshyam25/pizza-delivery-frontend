import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { listPizzas } from '../../redux/actions/pizzaActions'

export const Homepage = () => {
  const dispatch = useDispatch()
  const pizzaList = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaList
  useEffect(() => {
    dispatch(listPizzas())
  }, [dispatch])
  return (
    <>
      <Container expand='lg' className='py-3'>
        <Row>
          <Col className='text-center'>
            <h3>OUR MENU</h3>
          </Col>
        </Row>

        {loading ? (
          <Row>
            <Col className='text-center'>
              <Loader />
            </Col>
          </Row>
        ) : error ? (
          <Row>
            <Col className='text-center'>
              <Message variant='danger'>{error}</Message>
            </Col>
          </Row>
        ) : (
          <Row className='p-4'>
            {pizzas.map((item) => (
              <Col
                key={item._id}
                sm={12}
                md={6}
                lg={4}
                className='p-5 d-flex justify-content-center text-center'>
                <Card style={{ width: '16rem' }}>
                  <LinkContainer to={`/${item.category.toLowerCase()}`}>
                    <Card.Img variant='top' src={item.image} />
                  </LinkContainer>

                  <Card.Body className='py-3'>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}
