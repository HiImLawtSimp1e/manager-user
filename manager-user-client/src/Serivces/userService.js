import axios from "axios";

const RegisterUserService = (email, username, phone, password) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    username,
    phone,
    password,
  });
};

const LoginUserService = (account, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    account,
    password,
  });
};

export { RegisterUserService, LoginUserService };
