require("dotenv").config();

let express = require("express");
let app = express();
let user = require("./controllers/usercontroller");
let home = require("./controllers/homecontroller");
let graffiti = require("./controllers/graffiticontroller");
let mobile = require("./controllers/mobilecontroller");
let sequelize = require("./db");
let bodyParser = require("body-parser");

sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

//modal, login or signup
app.use("", home);
app.use("/user", user);

// unprotected parent route for mobile version of app
app.use("/mobile", mobile);

//protected routes
//home-getall, create, update, delete
app.use(require("./middleware/validate-session"));
app.use("/graffiti", graffiti);

app.listen(process.env.PORT, () =>
  console.log(`app be listenin mon, on ${process.env.PORT}`)
);