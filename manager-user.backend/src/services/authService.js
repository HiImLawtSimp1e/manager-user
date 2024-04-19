import bcrypt from "bcryptjs";
import { Op, where } from "sequelize";

import dbContext from "../models/index";

const salt = bcrypt.genSaltSync(10);

const isEmailExist = async (userEmail) => {
  let user = await dbContext.User.findOne({
    where: { email: userEmail },
  });
  console.log(userEmail, user);
  if (user === null) {
    return false;
  }
  return true;
};

const isPhoneExist = async (userPhone) => {
  let user = await dbContext.User.findOne({
    where: { phone: userPhone },
  });
  console.log(userPhone, user);
  if (user === null) {
    return false;
  }
  return true;
};

const hashUserPassword = (userPassword) => {
  let hash = bcrypt.hashSync(userPassword, salt);
  return hash;
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const registerUser = async (rawUserData) => {
  try {
    console.log(rawUserData);
    let checkEmailExist = await isEmailExist(rawUserData.email);
    let checkPhoneExist = await isPhoneExist(rawUserData.phone);
    if (checkEmailExist || checkPhoneExist) {
      return {
        message: "Email or Phone number has already registered",
        errorCode: 1,
      };
    }

    let hashPassword = hashUserPassword(rawUserData.password);

    await dbContext.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
    });

    return {
      message: "Created successfully",
      errorCode: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Something wrong in service",
      errorCode: -2,
    };
  }
};

const loginUser = async (rawUserData) => {
  try {
    console.log(rawUserData);
    let user = await dbContext.User.findOne({
      where: {
        [Op.or]: [
          { email: rawUserData.account },
          { phone: rawUserData.account },
        ],
      },
    });
    if (!user) {
      console.log("Not found user with account:", rawUserData.account);
      return {
        message: "Your account or your password is incorrect",
        errorCode: -1,
      };
    }
    console.log("check user:", user.get({ plain: true }));
    let isCorrectPassword = checkPassword(rawUserData.password, user.password);
    if (!isCorrectPassword) {
      console.log(
        "User password is not correct, account =",
        rawUserData.account,
        " ,password =",
        rawUserData.password,
        " ,hashPassword =",
        user.password
      );
      return {
        message: "Your account or your password is incorrect",
        errorCode: -1,
      };
    }
    console.log("Login successfully");
    return {
      message: "Login successfully",
      errorCode: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Something wrong in service",
      errorCode: -2,
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
