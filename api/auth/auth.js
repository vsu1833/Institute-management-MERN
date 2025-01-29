const jwt = require("jsonwebtoken");

// for school , student , teacher
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");

      if (!token) {
        res
          .status(401)
          .json({ success: false, message: "No token, Authorization denied." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode the token
      if (decoded) {
        req.user = decoded;
        if (roles.length && !roles.includes(req.user.role)) {
          res.status(401).json({ success: false, message: "Access denied." });
        } else {
          next();
        }
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};
module.exports = authMiddleware;
