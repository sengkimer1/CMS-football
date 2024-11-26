const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access Denied' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log('Decoded Token:', decoded); // Debugging
      next();
  } catch (err) {
      res.status(403).json({ message: 'Invalid Token' });
  }
};


module.exports = authMiddleware;

