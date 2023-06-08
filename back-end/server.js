require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routers/routes");
const login = require("./routers/auth");
// const roles = require("./routers/roles");
// const auth = require("./routers/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", login);
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
