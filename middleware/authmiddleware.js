const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(
      res.status(401).json({
        message: "Token is required",
      })
    );
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(_id);

    if (!user || user.token !== token) {
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
    next(
      res.status(401).json({
        message: error.message,
      })
    );
  }
};

module.exports = { authMiddleware };
