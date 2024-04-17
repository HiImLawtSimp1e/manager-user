import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import connection from "./configs/connectDB";

const app = express();

//register CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//config view engine
configViewEngine(app);

//register bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connection db (Sequelize ORM)
connection();

//init web route
initWebRoutes(app);
initApiRoutes(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Host is running on the http://localhost:" + PORT);
});
