const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "not token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        msg: "not authorised",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

// const adminAuth = (req, res, next) => {
//   if (!("authorization" in req.headers)) {
//     return res.status(400).json({ status: "error", msg: "not token found" });
//   }

//   const token = req.headers["authorization"].replace("Bearer ", "");

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

//       if (decoded.role === "admin") {
//         req.decoded = decoded;
//         next();
//       } else {
//         throw new Error();
//       }
//     } catch (error) {
//       return res.status(401).json({
//         status: "error",
//         msg: "unauthorised",
//       });
//     }
//   } else {
//     return res.status(403).send({ status: "error", msg: "missing token" });
//   }
// };

module.exports = { auth };
