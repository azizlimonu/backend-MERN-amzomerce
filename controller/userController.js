const { generateRefreshToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// create User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    res.json(newUser);
  } else {
    throw new Error('User Already Exists');
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);

    const updateUser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken
    }, {
      new: true
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    });

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateRefreshToken(findUser?._id),
    });
  } else {
    throw new Error("Wrong Username or password");
  }
});

// logout user
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error('No Refresh Token In Cookie');

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);

});

// get All User
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get User (single)
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error('No refresh token in cookie');

  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });

  if (!user) throw new Error("No existing refresh token or not match");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error || user.id !== decoded.id) {
      throw new Error('There is something wrong with the refresh token');
    }

    const accessToken = generateRefreshToken(user?._id);

    res.json({ accessToken });
  })
});



module.exports = {
  createUser, loginUser, getAllUser, getUser, logout, handleRefreshToken
}