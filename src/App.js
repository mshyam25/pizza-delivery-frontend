import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Homepage } from './pages/Homepage/Homepage'
import { VegPizzaspage } from './pages/VegPizzasPage/VegPizzasPage'
import NonVegPizzasPage from './pages/NonVegPizzasPage/NonVegPizzasPage'
import CustomisePizzaPage from './pages/CustomisePizzaPage/CustomisePizzaPage'
import CartPage from './pages/CartPage/CartPage'
import SignInPage from './pages/SignInPage/SignInPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import UserProfile from './pages/UserProfile/UserProfilePage'
import DeliveryAddressPage from './pages/DeliveryAddressPage/DeliveryAddressPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage'
import UsersListPage from './pages/UsersListPage/UsersListPage'
import OrdersListPage from './pages/OrdersListPage/OrdersListPage'
import UserOrdersPage from './pages/UserOrdersPage/UserOrdersPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/veg' element={<VegPizzaspage />} />
            <Route path='/non-veg' element={<NonVegPizzasPage />} />
            <Route
              path='/pizzas/customise/:id'
              element={<CustomisePizzaPage />}
            />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/profile/myorders' element={<UserOrdersPage />} />
            <Route path='/deliveryaddress' element={<DeliveryAddressPage />} />
            <Route path='/ordersummary' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<PaymentPage />} />
            <Route path='/admin/users' element={<UsersListPage />} />
            <Route path='/admin/orders' element={<OrdersListPage />} />
            <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
