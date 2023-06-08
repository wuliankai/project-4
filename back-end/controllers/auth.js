const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const register = async (req, res) => {
//   try {
//     const auth = await prisma.user.findOne({
//       phone_number: req.body.phoneNumber,
//     });
//     if (auth) {
//       return res
//         .status(400)
//         .json({ status: "error", msg: "duplicate phone number" });
//     }

//     // const hash = await bcrypt.hash(req.body.password, 12);

//     await prisma.user.create({
//       name: req.body.name,
//       phone_number: req.body.phoneNumber,
//     });

//     res.json({ status: "ok", msg: "user registered" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: "invalid registration" });
//   }
// };

const login = async (req, res) => {
  try {
    const auth = await prisma.user.findMany({
      where: {
        AND: {
          name: { equals: req.body.name },
          phone_number: { equals: req.body.phone_number },
        },
      },
    });
    if (auth.length === 0) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const claims = {
      phone_number: auth[0].phone_number,
      is_admin: auth[0].is_admin,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh, is_admin: auth[0].is_admin });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    console.log(err);

    if (err) {
      // unauthorize user
      return res.sendStatus(401);
    }
    console.log(user);
    req.user = user;

    next();
  });
};

module.exports = {
  // register,
  authenticateToken,
  login,
};
