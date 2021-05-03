require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
// const helmet = require("helmet");

let user = require("./controllers/usercontroller");
let home = require("./controllers/homecontroller");
let graffiti = require("./controllers/graffiticontroller");
let mobile = require("./controllers/mobilecontroller");
let sequelize = require("./db");

sequelize.sync();

// app.use(helmet());
app.use(require("./middleware/headers"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//modal, login or signup
app.use("", home);
app.use("/user", user);

// unprotected parent route for mobile version of app
app.use("/mobile", mobile);

//protected routes
//home-getall, create, update, delete
app.use(require("./middleware/validate-session"));
app.use("/graffiti", graffiti);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`app be listenin mon, on ${process.env.PORT}`)
);
