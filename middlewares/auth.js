const auth = require('../middlewares/auth');

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(403).json({ message: "No JWT token provided" });

  try {
    const decoded = jwt.verify(token, 'secret-key'); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid JWT Token" });
  }
};

module.exports = authenticate;
