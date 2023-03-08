const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");

    if (!token) {
      next(
        res.status(401).json({
          message: "Token is required",
        })
      );
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      next(
        res.status(401).json({
          message: "Not authorized",
        })
      );
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error.message);
  }
};

module.exports = { authMiddleware };
