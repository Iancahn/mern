// install ReactRouterDOM so we can setup routes
// once we created the Header component, we import the header into our browser router, so we can have the header on all pages

import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
// import Components
import Header from './components/Header';

export default function App() {
  return (
    // we then cover everything with the browser router, routes and individual route(s)
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  )
}
