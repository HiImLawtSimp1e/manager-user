import bcrypt from "bcryptjs";

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

const checkPassword = (pass, hashPassword) => {
  return bcrypt.compareSync("B4c0//", hash);
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

const loginUser = async (rawData) => {
  try {
    console.log(rawData);
    return {
      message: "waiting to tomorrow",
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
};
