import "./Login.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { LoginUserService } from "../../Serivces/userService";

const Login = () => {
  let navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidAccount: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultValidInput);

  const handleLogin = async () => {
    setObjValidInput(defaultValidInput);
    if (!account) {
      setObjValidInput({ ...defaultValidInput, isValidAccount: false });
      toast.error("Please enter your account");
      return false;
    }
    if (!password) {
      setObjValidInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return false;
    }
    await LoginUserService(account, password);
  };

  const navigateToCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-lg-7">
            <h1 className="brand">Manage User</h1>
            <div className="detail d-lg-block d-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab illum
              veniam deleniti blanditiis excepturi explicabo natus voluptas,
              modi animi voluptate est dolorum aspernatur illo ullam temporibus
              sit consequuntur aliquam voluptatum?
            </div>
          </div>
          <div className="content-right col-12 col-lg-5 d-flex flex-column p-3 gap-3">
            <input
              className={
                objValidInput.isValidAccount
                  ? "form-control"
                  : "is-invalid form-control"
              }
              type="text"
              placeholder="Your Account"
              value={account}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
            <input
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            <hr />
            <button
              className="btn btn-outline-success"
              onClick={navigateToCreateAccount}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
