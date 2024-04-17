import authService from "../services/authService";

const handleRegister = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.username || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        message: "Missing required parameter",
        errorCode: "1",
        data: "",
      });
    }

    let data = await authService.registerUser(req.body);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      message: "Error: ",
      errorCode: "-1",
      data: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await authService.loginUser(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      message: "Error: ",
      errorCode: "-1",
      data: "",
    });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
