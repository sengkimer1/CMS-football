// Load environment variables
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
console.log('JWT_SECRET loaded successfully');

// User registration controller
const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Validate input fields
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create and save a new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Return success response
        return res.status(201).json({
            message: 'User registered successfully.',
            token,
        });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// User login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '12h' }
        );

        // Return success response
        res.json({
            message: 'User registered successfully.',
            token,
            userId: user._id,
            role: user.role,
        });
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllUsers = async (req, res) => {
    try {
      console.log('Fetching all users...');
      const users = await User.find(); // Fetch all users from the database
  
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      console.log('Users fetched:', users);
      res.status(200).json(users); // Respond with the user data
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Get the ID from the URL parameter
      console.log(`Fetching user with ID: ${userId}`);
  
      const user = await User.findById(userId); // Fetch the user by ID
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('User fetched:', user);
      res.status(200).json(user); // Respond with the user data
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
  
      if (error.kind === 'ObjectId') {
        // Handle invalid ObjectId errors
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const updateUser = async (req, res) => {
    const userId = req.params.id;  // Get the user ID from the URL parameter
    const { firstname, lastname } = req.body; // Get updated data from the request body

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the fields if provided
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;

        // Save the updated user
        await user.save();

        // Send a success response
        res.status(200).json({
            message: 'User updated successfully',
            user: user
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser
};
