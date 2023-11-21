import {React, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { signal } from "@preact/signals";
import { BrowserRouter, Route, Routes, Navigate, useRoutes } from 'react-router-dom';

import './index.css';
import Layout from './pages/layout';
import { Service, Services, ServicesList } from './pages/services';
import Login from './pages/login';
import User from './pages/user';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import PurchaseComplete from './pages/purchase-complete';
import Home from './pages/home';
import EditUser from './pages/edit-user';

let therapies = {
  'firstService': {
    title: 'First Service',
  },
  'secondService': {
    title: 'Second Service',
  }
}


// function Routes(){
//   const element = useRoutes([

//   ]);
//   return element;
// }

export const loggedIn = signal(false);

export default function App() {

console.log(loggedIn.value)


  return (
    <BrowserRouter>
      <Routes>

        <Route path="login" element={ <Login />} />
        <Route path="/" element={<Layout />}>

          {/* landing page */}
          <Route path="/" element={<Home />} />

          {/* cart page */}
          <Route path="cart/*" element={<Cart />}>
            <Route path="checkout/*" element={<Checkout />} >
              <Route path="success" element={<PurchaseComplete />} />
            </Route>
          </Route>

          {/* user page */}
          <Route path="user/*" element={<User />}>
            <Route path="edit" element={<EditUser />} />
          </Route>

          <Route path="/services" element={<Services />}>
            <Route index element={<ServicesList therapies={therapies} />} />
            <Route path=":slug" element={<Service therapies={therapies} />} />
            {/* https://blog.logrocket.com/react-router-v6-guide/#building-functional-components */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
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
