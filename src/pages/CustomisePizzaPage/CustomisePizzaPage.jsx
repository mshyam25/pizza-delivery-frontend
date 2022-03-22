import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import {
  getPizzaById,
  getPizzaToppings,
} from '../../redux/actions/pizzaActions'
import {
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  Card,
  Button,
} from 'react-bootstrap'
import { useState } from 'react'
import { addToCart } from '../../redux/actions/cartActions'
const CustomisePizzaPage = () => {
  const [qty, setQty] = useState(1)
  const [sauce, setSauce] = useState('Tomato')
  const [cheese, setCheese] = useState('Hand Tossed')

  const [veggies, setVeggies] = useState({})
  const veggiekeys = Object.keys(veggies)
  const veggiesSelected = veggiekeys.filter((key) => veggies[key] === true)
  const veggiePrice =
    veggiesSelected.length > 3 ? (veggiesSelected.length - 3) * 50 : 0

  const [meat, setMeat] = useState({})
  const meatkeys = Object.keys(meat)
  const meatsSelected = meatkeys.filter((key) => meat[key] === true)
  const meatPrice =
    meatsSelected.length > 1 ? (meatsSelected.length - 1) * 50 : 0

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const pizzaDetails = useSelector((state) => state.pizzaDetails)
  const { loading, error, pizza } = pizzaDetails

  const pizzaToppings = useSelector((state) => state.pizzaToppings)
  const { toppings } = pizzaToppings

  useEffect(() => {
    dispatch(getPizzaById(params.id))
    dispatch(getPizzaToppings())
  }, [dispatch, params])
  const totalPrice = Number(veggiePrice + meatPrice + qty * pizza.price)
  const handleVeggieChange = async (e) => {
    setVeggies({ ...veggies, [e.target.name]: e.target.checked })
  }
  const handleMeatChange = (e) => {
    setMeat({ ...meat, [e.target.name]: e.target.checked })
  }

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: `${pizza._id}-${totalPrice}`,
        name: pizza.name,
        image: pizza.image,
        sauce,
        cheese,
        veggiesSelected,
        veggiePrice,
        meatsSelected,
        meatPrice,
        qty,
        pizzaPrice: pizza.price * qty,
        totalPrice,
      })
    )

    navigate(`/cart`)
  }
  return (
    <>
      <Link className='btn btn-danger my-3' to='/'>
        Go Back
      </Link>
      <Row className='p-5'>
        <Message variant='warning'>
          <h3>You can add upto 3 Veggies and 1 meat free of cost.</h3>
        </Message>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col
              md={4}
              className='p-5 d-flex justify-content-center text-center'>
              <ListGroup variant='flush'>
                <ListGroup.Item className='text-center'>
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    style={{ width: '16rem' }}
                    fluid></Image>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                  <h5>{pizza.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                  <Row>
                    <Col>
                      <h6>
                        Price : <strong>Rs.{pizza.price}</strong>
                      </h6>
                    </Col>
                    <Col>
                      {pizza.countInStock > 0 ? (
                        <strong>In Stock</strong>
                      ) : (
                        'Out Of Stock'
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <h5>Choose quantity</h5>
                    </Col>
                    <Col>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {[...Array(pizza.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>Choose Cheese type</h5>
                  <Form.Select
                    value={cheese}
                    onChange={(e) => setCheese(e.target.value)}>
                    {toppings.map((x) =>
                      x.cheese.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4} className='p-5'>
              <ListGroup>
                <ListGroupItem>
                  <h5>Choose Sauce type</h5>
                  <Form.Select
                    value={sauce}
                    onChange={(e) => setSauce(e.target.value)}>
                    {toppings.map((x) =>
                      x.sauce.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </ListGroupItem>

                <ListGroupItem>
                  <h5>Choose Veggies</h5>
                  {toppings.map((x) =>
                    x.veggies.map((type) => (
                      <Form.Check
                        label={type}
                        name={type}
                        onChange={handleVeggieChange}></Form.Check>
                    ))
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h5>Choose Veggies</h5>
                  {toppings.map((x) =>
                    x.meat.map((type) => (
                      <Form.Check
                        label={type}
                        name={type}
                        onChange={handleMeatChange}></Form.Check>
                    ))
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col
              md={4}
              className='p-5 d-flex justify-content-center text-center'>
              <Card style={{ width: '16rem' }}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Pizza Base :</Col>
                      <Col>{pizza.name}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Sauce : </Col>
                      <Col>{sauce} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Cheese : </Col>
                      <Col>{cheese} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Veggies added: </Col>
                      <Col>{veggiesSelected.length}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Veggies Price : </Col>
                      <Col>{veggiePrice} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Meat added : </Col>
                      <Col>{meatsSelected.length}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Meat Price : </Col>
                      <Col>{meatPrice} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty : </Col>
                      <Col>{qty} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Pizza Price: </Col>
                      <Col>{qty * pizza.price} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price : </Col>
                      <Col>{totalPrice} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className='text-center' onClick={addToCartHandler}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CustomisePizzaPage
