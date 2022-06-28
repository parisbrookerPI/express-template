const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;

//import routers here
const indexRouter = require("./routes/index.routes");

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//register middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "somesecret",
    resave: true,
    saveUninitialized: true,
    // store: MongoStore.create({
    //   client: db.getClient(),
    //   collectionName: "sessions",
    //   ttl: 24 * 60 * 60 * 1000,
    //   autoRemove: "interval",
    //   autoRemoveInterval: 10,
    // }),
  })
);

//register routers
app.use("/", indexRouter);

//catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, function () {
  console.log(`Express server listening on ${PORT}`);
});

module.exports = app;
