import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming you store the user role in the token (e.g., is_admin)
    if (decoded.is_admin) {
      next();  // Proceed to the route handler if the user is an admin
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Invalid or expired token" });
  }
};

export default adminMiddleware;
