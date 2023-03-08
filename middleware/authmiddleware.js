const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");

  if (!token) {
    next(res.status(401).json({ message: "Not authorized" }));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error.message);
  }
};

module.exports = { authMiddleware };
