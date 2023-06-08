const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// const { register } = require("../controllers/auth");
const { login } = require("../controllers/auth");

// router.put("/register", register);
router.post("/login", login);

module.exports = router;
