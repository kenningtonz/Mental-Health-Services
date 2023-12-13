import { React } from 'react';
import ReactDOM from 'react-dom/client';
import { signal } from "@preact/signals-react";
import { BrowserRouter, Route, Routes, Navigate, useRoutes } from 'react-router-dom';

import {UserInfo, ForgotPass, SignIn, SignUp, EditUser} from './components';
import {Cart, Checkout, PurchaseComplete, LandingPage, UserProfile, Home} from './pages';

import './css/index.scss';
import './css/landingpage.scss';
import './css/services.scss';
import './css/layout.scss'
import Layout from './pages/layout';
import { Service, Services } from './pages/services';


// function Routes(){
//   const element = useRoutes([

//   ]);
//   return element;
// }

export const loggedIn = signal(false);
export const filteredServices = signal([]);
export const title = signal("title");
export const cart = signal([]);
export const currentUser = signal({});

export default function App() {

  console.log(loggedIn.value)


  return (
    <BrowserRouter>
      <Routes>

        {/* landing page */}
        <Route path="/landing/" element={<LandingPage />} >
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpass" element={<ForgotPass />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* cart page */}
          <Route path="cart/*" element={<Cart />} />
          <Route path="cart/checkout" element={<Checkout />} />
          <Route path="cart/checkout/success" element={<PurchaseComplete />} />

          {/* user page */}
          <Route path="user/*" element={<UserProfile />}>
            <Route path="" element={<UserInfo canEdit={true}/>} />
            <Route path="edit" element={<EditUser />} />
          </Route>

          <Route path="/services" element={<Services />}>
            {/* https://blog.logrocket.com/react-router-v6-guide/#building-functional-components */}
          </Route>
            <Route path="/services/:slug" element={<Service/>} />
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
