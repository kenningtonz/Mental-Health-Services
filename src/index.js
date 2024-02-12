import { React, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { render } from "react-dom";
import { signal } from "@preact/signals-react";
import { BrowserRouter, Route, Routes, Navigate, Switch, useLocation, useRoutes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ForgotPass, SignIn, SignUp, EditUser, Loading } from './components';
import { Cart, Checkout, PurchaseComplete, LandingPage, UserProfile, Home, Service, Services } from './pages';

import ProtectedRoute from './protectedRoute';

import { checkIsSignedIn } from './functions/userAuth';

import './css/index.scss';
import './css/landingpage.scss';
import './css/services.scss';
import './css/layout.scss'
import './css/utility.scss';
import './theme/theme.scss';
import './css/primereactOverrides.scss'
import Layout from './layout';

// const AnimatedRoutes = useRoutes([
//   {
//     path: "/landing/",
//     element: <LandingPage />,
//     children: [
//       { path: "signin", element: <SignIn /> },
//       { path: "signup", element: <SignUp /> },
//       { path: "forgotpass", element: <ForgotPass /> }
//     ]
//   },
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "cart/*", element: <Cart /> },
//       { path: "cart/checkout", element: <Checkout /> },
//       { path: "cart/checkout/success", element: <PurchaseComplete /> },
//       {
//         path: "user/*",
//         element: <UserProfile />,
//         children: [
//           { path: "", element: <UserInfo canEdit={true} /> },
//           { path: "edit", element: <EditUser /> }
//         ]
//       },
//       {
//         path: "/services",
//         element: <Services />,
//         children: [
//           { path: ":slug", element: <Service /> }
//         ]
//       }
//     ]
//   }
// ]);


const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup >
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/landing/" element={<LandingPage />} >
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            {/* <Route path="forgotpass" element={<ForgotPass />} /> */}
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* cart page */}
            <Route path="cart/*" element={<Cart />} />
            <Route path="cart/checkout" element={<Checkout />} />
            <Route path="cart/checkout/success" element={<PurchaseComplete />} />

            {/* user page */}
            <Route path="user/" element={<UserProfile />}>
              {/* <Route path="contact" element={<UserContactInfo />} />
              <Route path="billing" element={<EditUser />} />
              <Route path="history" element={<EditUser />} /> */}
            </Route>

            <Route path="/services" element={<Services />}>
              {/* https://blog.logrocket.com/react-router-v6-guide/#building-functional-components */}
            </Route>

            <Route path="/services/:slug" element={<Service />} />

          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export const loggedIn = signal(checkIsSignedIn());
export const currentUser = signal({});
const loading = signal(true);

export default function App() {
  // loggedIn.value = checkIsSignedIn();
  // checkIsSignedIn();

  useEffect(() => {
    setTimeout(() => { loading.value = false }, 2000)
  }, [])
  if (loading.value) {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <Routes >

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/landing/" element={<LandingPage />} >
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            {/* <Route path="forgotpass" element={<ForgotPass />} /> */}
          </Route>
          {/* cart page */}
          <Route path="cart/*" element={<ProtectedRoute children={<Cart />} />} />
          <Route path="cart/checkout" element={<Checkout />} />
          <Route path="cart/checkout/success" element={<PurchaseComplete />} />

          {/* user page */}
          <Route path="user/" element={<ProtectedRoute children={<UserProfile />} />}>

          </Route>

          <Route path="/services" element={<Services />}>
            {/* https://blog.logrocket.com/react-router-v6-guide/#building-functional-components */}
          </Route>

          <Route path="/services/:slug" element={<Service />} />

        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  );
}
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider
//     router={router}
//     fallbackElement={<Loading />}
//   />
// );

// const Root = () => <BrowserRouter><App /></BrowserRouter>;
// render(<Root />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
