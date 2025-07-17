const User = require('../models/user-models');

const home = async (req, res) => {
  try {
    const alluser = await User.find();
    res.status(200).send(alluser);
    res.status(201).send("welcome to controller home page");
  } catch (error) {
    console.log(error);
  }
};

// Registration controller
const register = async (req, res) => {
  try {
    const { username, email, phone, address, password, role, storName } = req.body;
     console.log(req.body);
    // Check if an admin already exists
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ msg: 'An admin already exists' });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(402).json({ msg: 'Email already exists' });
    }

    const userCreated = await User.create({ username, email, phone, address, password, role, storName });

    res.status(201).json({
      message: 'Registration successful',
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Registration failed' });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    // Generate a token for the user
    const token = await user.generateToken();

    res.status(200).json({
      msg: 'Login successful',
      token,
      userId: user._id.toString(),
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Login failed' });
  }
};

const allUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    // const deleteUser = await User.findByIdAndDelete(userId);
    const deleteUser = await User.deleteOne({ _id: id });
    // console.log(deleteUser);
    if (!deleteUser) {
      res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { home, register, login, allUser, deleteUser };
