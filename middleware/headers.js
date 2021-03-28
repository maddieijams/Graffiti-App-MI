// module.exports = (req, res, next) => {
//   res.header("access-control-allow-origin", "*");
//   res.header("access-control-allow-methods", "POST, DELETE, PUT, GET, OPTIONS");
//   res.header(
//     "access-control-allow-headers",
//     "Origin, X-Requested-With, Content-Type, Authorization"
//   );
//   next();
// };

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
