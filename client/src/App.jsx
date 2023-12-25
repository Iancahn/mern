// install ReactRouterDOM so we can setup routes
// once we created the Header component, we import the header into our browser router, so we can have the header on all pages

import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
// import Components
import Header from './components/Header';

export default function App() {
  return (
    // we then cover everything with the browser router, routes and individual route(s)
    // The private route makes it so that you can only see the profile page when you are logged in
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      <Route element = {<PrivateRoute />} >
      <Route path="/profile" element={<Profile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
