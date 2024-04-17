import bcrypt from "bcryptjs";
import dbContext from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hash = bcrypt.hashSync(userPassword, salt);
  return hash;
};

const getUserById = async (id) => {
  let user = {};
  user = await dbContext.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
};

const createNewUser = async (email, password, username) => {
  let passwordHash = hashUserPassword(password);

  try {
    await dbContext.User.create({
      username: username,
      email: email,
      password: passwordHash,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

const getUserList = async () => {
  let users = [];
  users = await dbContext.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await dbContext.User.destroy({
    where: { id: id },
  });
};

const updateUserInfo = async (email, username, id) => {
  await dbContext.User.update(
    { email: email, username: username },
    { where: { id: id } }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
