import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
  const name = "Law";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  let users = await userService.getUserList();
  return res.render("user.ejs", { users });
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res.redirect("/user");
};

const handleGetUpdateUser = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(req.params.id);
  let userData = user;
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await userService.updateUserInfo(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
  handleGetUpdateUser,
  handleUpdateUser,
};
