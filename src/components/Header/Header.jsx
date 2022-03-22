import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleLogout = () => {
    dispatch(logout())
    navigate('signin')
  }
  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <LocalPizzaIcon fontSize='large' />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <strong>
                    <h4>Home</h4>
                  </strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/veg'>
                <Nav.Link>
                  <strong>
                    <h4>Veg Pizzas</h4>
                  </strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/non-veg'>
                <Nav.Link>
                  <strong>
                    <h4>Non Veg Pizzas</h4>
                  </strong>
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <LinkContainer to='/admin/users'>
                  <Nav.Link>
                    <strong>
                      <h4>Users</h4>
                    </strong>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <LinkContainer to='/admin/orders'>
                  <Nav.Link>
                    <strong>
                      <h4>Orders</h4>
                    </strong>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <strong>
                    <h4>
                      <ShoppingCartIcon fontSize='large' />
                    </h4>
                  </strong>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <h4>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to={`/profile`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={`/profile/myorders`}>
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </h4>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link>
                    <strong>
                      <h4>
                        Log in <AccountCircleIcon fontSize='large' />
                      </h4>
                    </strong>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
