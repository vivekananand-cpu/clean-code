
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './core/Home';
import Signup from './user/Signup';
import SignIn from './user/SignIn';
import Admin from './user/Admin';
import User from './user/User';
import AdminRoute from './auth/AdminRoute';
import UserRoute from './auth/UserRoute';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<AdminRoute Child={Admin} />} />
        <Route path="/user/solved" element={<UserRoute Child={User} />} />
      </Routes>
    </div>
  );
}

export default App;
