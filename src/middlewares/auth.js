const adminAuth = (req, res, next) => {
  // const token = req.body.token;
  const token = "admin123"; // Simulating token retrieval for demonstration purposes
  const isAdminAuthenticated = token === "admin123";
  console.log("User authentication status:", isAdminAuthenticated);
  if (isAdminAuthenticated) {
    next();
  } else {
    res.status(401).send("unauthorized access");
  }
};

const userAuth = (req, res, next) => {
  // const token = req.body.token;
  const token = "user123"; // Simulating token retrieval for demonstration purposes
  const isUserAuthenticated = token === "user123";
  console.log("User authentication status:", isUserAuthenticated);
  if (isUserAuthenticated) {
    next();
  } else {
    res.status(401).send("unauthorized access");
  }
};

module.exports = { adminAuth, userAuth };
