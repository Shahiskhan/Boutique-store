// src/App.jsx
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Collections from './pages/Collections'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import NotFound from './pages/NotFound'
import AdminRoute from './admin/AdminRoute'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Products from './admin/pages/Products'
import AddProduct from './admin/pages/AddProduct'
import AdminOrders from './admin/pages/Orders'
import AdminOrderDetail from './admin/pages/OrderDetail'

function StoreLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="collections" element={<Collections />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetail />} />
        <Route path="order-success/:orderId" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/:productId/edit" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:orderId" element={<AdminOrderDetail />} />
      </Route>
    </Routes>
  )
}

export default App