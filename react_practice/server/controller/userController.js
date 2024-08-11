
const userModel = require('../model/userModel');
const passwordService = require('../services/PasswordService');
const jwtService = require('../services/jwtServices');

async function createUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const hashedPassword = await passwordService.hashPassword('userPassword');
    const result = await userModel.saveUser(email, hashedPassword);
    if (result) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function findUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const result = await userModel.findByUser(email);
    if (!result.length) {
      res.status(401).json({ error: 'Invalid User or Password' });
    }
    console.log(result.user.Password);
    const isPasswordValid = await passwordService.comparePassword(password, result.user.Password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    // Generate JWT token with user information (e.g., user ID)
    const token = jwtService.signToken({ userId: result.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.send({ token });   
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function findFoodItem(req, res) {
  const { foodItem } = req.body;
  if (!foodItem) {
    return res.status(400).json({ error: 'Food Item name is required' });
  }
  try {
    const result = await userModel.findFoodItem(foodItem);
    if (!result.length) {
      res.status(401).json({ error: 'Invalid Food name' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createUser ,findUser, findFoodItem };