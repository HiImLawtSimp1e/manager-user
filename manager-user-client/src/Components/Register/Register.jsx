import "./Register.scss";
import "react-toastify/ReactToastify.css";

import { useState } from "react";
import { toast } from "react-toastify";

import { RegisterUserService } from "../../Serivces/userService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);
    let regex = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!regex.test(email)) {
      toast.error("Invalid email");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!username) {
      toast.error("Username is required");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Confirm password is incorrect");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();
    if (check) {
      let response = await RegisterUserService(
        email,
        username,
        phone,
        password
      );
      let serverData = response.data;
      if (+serverData.errorCode === 0) {
        toast.success(serverData.message);
      } else {
        toast.error(serverData.message);
      }
    }
  };

  return (
    <div className="register-container">
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
            <div className="form-group">
              <label>Email:</label>
              <input
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handleRegister}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
