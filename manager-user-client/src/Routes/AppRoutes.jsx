import { Routes, Route } from "react-router-dom";

import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import User from "../Components/User/User";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/user" element={<PrivateRoute />}>
          <Route exact path="/user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
