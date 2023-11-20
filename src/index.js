import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';

import './index.css';
import Layout from './pages/layout';
import Service from './pages/service';
import Services from './pages/services';
import Login from './pages/login';
import User from './pages/user';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import PurchaseComplete from './pages/purchase-complete';
import Home from './pages/home';
import EditUser from './pages/edit-user';


export default function App() {
  redirect('/login');

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>

          {/* landing page */}
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>

          {/* cart page */}
          <Route path="cart/*" Component={Cart}>
            <Route path="checkout/*" Component={Checkout} >
              <Route path="success" Component={PurchaseComplete} />
            </Route>
          </Route>

          {/* user page */}
          <Route path="user/*" Component={User}>
            <Route path="edit" Component={EditUser} />
          </Route>

          <Route path="services/*" Component={Services}>
            <Route path="service" Component={Service} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
