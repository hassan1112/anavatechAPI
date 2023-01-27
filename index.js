const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const paletNumber = require("./routes/paletNumberRoute");
const AppError = require("./util/AppError");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const db = require("./config/DB");


dotenv.config();
const PORT = process.env.PORT || 4000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
//

db.sequelize.sync({ alter: true });
//parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/Imatriculation/api/v1/palet-number", console.log());

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const server = app.listen(PORT, () => {
  console.log(`connection has been estblished on port : ${PORT}`);
});

// process.on('unhandledRejection', (res,err) => {
//     console.log('UNHANDLED REJECTION! Shutting down...');
//     // console.log(err.name, err.message);
//     server.close(() => {
//       process.exit(1);
//     });
//   });
